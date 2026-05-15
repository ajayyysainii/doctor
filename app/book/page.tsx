"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appointmentContent, bookingConfig } from "@/utils/siteData";
import { todayIsoInTz } from "@/lib/slots";

type SlotRow = { isoStart: string; available: boolean };

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("razorpay_script"));
    document.body.appendChild(s);
  });
}

export default function BookPage() {
  const router = useRouter();
  const [date, setDate] = useState(() => todayIsoInTz());
  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [doctorValue, setDoctorValue] = useState(appointmentContent.doctors[0]?.value ?? "");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minDate = useMemo(() => todayIsoInTz(), []);

  const fetchSlots = useCallback(async () => {
    setLoadingSlots(true);
    setError(null);
    try {
      const r = await fetch(`/api/slots?date=${encodeURIComponent(date)}`);
      const j = (await r.json()) as { slots?: SlotRow[]; error?: string };
      if (!r.ok) throw new Error(j.error ?? "slots_failed");
      setSlots(j.slots ?? []);
      setSelectedIso(null);
    } catch {
      setError("Could not load slots. Try again.");
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [date]);

  useEffect(() => {
    void fetchSlots();
  }, [fetchSlots]);

  const onPay = async () => {
    setError(null);
    if (!patientName.trim() || !phone.trim() || !email.trim() || !selectedIso || !doctorValue) {
      setError("Please fill all fields and pick a slot.");
      return;
    }
    setBusy(true);
    try {
      await loadRazorpayScript();
      const Razorpay = window.Razorpay;
      if (!Razorpay) throw new Error("razorpay_missing");

      const bookRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: patientName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          doctorValue,
          slotStart: selectedIso,
        }),
      });
      const bookJson = (await bookRes.json()) as {
        error?: string;
        bookingId?: string;
        orderId?: string;
        key?: string;
        patientName?: string;
        phone?: string;
      };
      if (!bookRes.ok) {
        if (bookRes.status === 409) setError("That slot was just taken. Pick another.");
        else setError(bookJson.error ?? "Booking failed.");
        setBusy(false);
        return;
      }

      const { bookingId, orderId, key } = bookJson;
      if (!bookingId || !orderId || !key) {
        setError("Invalid server response.");
        return;
      }

      const handler = async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        const v = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId,
          }),
        });
        const vj = await v.json();
        if (!v.ok) {
          setError((vj as { error?: string }).error ?? "Payment verification failed.");
          setBusy(false);
          return;
        }
        router.push(`/book/success?bookingId=${encodeURIComponent(bookingId)}`);
      };

      const rzp = new Razorpay({
        key,
        order_id: orderId,
        name: "Video consultation",
        description: `Orthopedic video consult (${bookingConfig.slotMinutes} min slot)`,
        handler,
        prefill: {
          name: patientName.trim(),
          contact: phone.trim(),
        },
        theme: { color: "#008de4" },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      setError("Payment could not start. Check Razorpay keys and try again.");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f6fa] py-16 px-4">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-black text-gray-900">Book video consultation</h1>
        <p className="mt-2 text-sm text-gray-600">
          Choose a slot, pay securely, then join the video room at the scheduled time.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-900">
            Doctor
            <select
              value={doctorValue}
              onChange={(e) => setDoctorValue(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-gray-800"
            >
              {appointmentContent.doctors.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-900">
            Your name
            <input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-gray-800"
              placeholder="Full name"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-900">
            WhatsApp / phone
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-gray-800"
              placeholder="+91…"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-900">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-gray-800"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-900">
            Date
            <input
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-gray-800"
            />
          </label>

          <div>
            <p className="text-sm font-semibold text-gray-900">Available slots (IST)</p>
            <div className="mt-2 grid max-h-56 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
              {loadingSlots ? (
                <span className="col-span-full text-sm text-gray-500">Loading…</span>
              ) : slots.length === 0 ? (
                <span className="col-span-full text-sm text-gray-500">No slots this day.</span>
              ) : (
                slots.map((s) => {
                  const label = new Date(s.isoStart).toLocaleTimeString("en-IN", {
                    timeZone: bookingConfig.timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const active = selectedIso === s.isoStart;
                  return (
                    <button
                      key={s.isoStart}
                      type="button"
                      disabled={!s.available}
                      onClick={() => s.available && setSelectedIso(s.isoStart)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                        !s.available
                          ? "cursor-not-allowed bg-gray-100 text-gray-400 line-through"
                          : active
                            ? "bg-[#008de4] text-white"
                            : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="button"
            disabled={busy || !selectedIso}
            onClick={() => void onPay()}
            className="rounded-xl bg-[#008de4] py-4 font-bold text-white shadow disabled:opacity-50"
          >
            {busy ? "Please wait…" : "Pay & confirm"}
          </button>

          <Link href="/" className="text-center text-sm font-medium text-[#008de4] hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
