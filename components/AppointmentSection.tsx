"use client";

import Link from "next/link";
import { appointmentContent } from "@/utils/siteData";

export default function AppointmentSection() {
  return (
    <section id="contact" className="w-full py-24 bg-white font-sans scroll-mt-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
          {/* Left Column: Form */}
          <div className="flex-1 bg-[#f0f6fa] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-[3rem] font-black text-black mb-10 tracking-tight leading-tight">
              {appointmentContent.headline}
            </h2>

            <p className="mb-8 text-gray-600 text-[15px] leading-relaxed">
              Book a paid video consultation: pick a time slot, pay securely online, then join your doctor on video at
              the scheduled time. You will receive a WhatsApp confirmation with your join link.
            </p>

            <Link
              href="/book"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#008de4] py-4 font-bold text-[15px] text-white shadow-[0_10px_20px_rgba(0,141,228,0.25)] transition hover:bg-blue-600 hover:-translate-y-[2px]"
            >
              {appointmentContent.ctaLabel}
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 w-full relative min-h-[500px] lg:min-h-auto">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-xl">
              <img 
                src="/appointment-doctor.png" 
                alt="Doctor writing on clipboard" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -z-10 -bottom-8 -right-8 w-[200px] h-[200px] bg-blue-100/50 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
