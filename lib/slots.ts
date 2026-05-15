import { bookingConfig, clinic } from "@/utils/siteData";

const TZ = bookingConfig.timezone;

/** Parse "9:00 am" / "7:00 pm" style strings to minutes from midnight. */
export function parseMeridiemTimeToMinutes(input: string): number | null {
  const s = input.trim().toLowerCase();
  const m = s.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
  if (!m) return null;
  let h = parseInt(m[1]!, 10);
  const min = parseInt(m[2]!, 10);
  const ap = m[3]!;
  if (h < 1 || h > 12 || min < 0 || min > 59) return null;
  if (ap === "am") {
    if (h === 12) h = 0;
  } else {
    if (h !== 12) h += 12;
  }
  return h * 60 + min;
}

/** Split clinic range like "9:00 am – 7:00 pm" into open/close minutes. */
export function parseClinicDayRange(timeRange: string): { openMin: number; closeMin: number } | null {
  const parts = timeRange.split(/\s*[–-]\s*/);
  if (parts.length !== 2) return null;
  const openMin = parseMeridiemTimeToMinutes(parts[0]!);
  const closeMin = parseMeridiemTimeToMinutes(parts[1]!);
  if (openMin === null || closeMin === null || closeMin <= openMin) return null;
  return { openMin, closeMin };
}

/** Calendar YYYY-MM-DD in Asia/Kolkata for "now". */
export function todayIsoInTz(now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: TZ });
}

export function weekdayShortInTz(isoDate: string): string {
  const ref = istWallTimeToUtc(isoDate, 12, 0);
  return ref.toLocaleDateString("en-US", { weekday: "short", timeZone: TZ });
}

/** Interpret wall-clock time on a calendar day in IST as a UTC Date. */
export function istWallTimeToUtc(isoDate: string, hour: number, minute: number): Date {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return new Date(`${isoDate}T${hh}:${mm}:00+05:30`);
}

export type SlotInterval = { slotStart: Date; slotEnd: Date; isoStart: string };

/**
 * Generate fixed slots for a calendar day (YYYY-MM-DD) in IST from `clinic.hours`.
 */
export function generateSlotsForDate(isoDate: string): SlotInterval[] {
  const wd = weekdayShortInTz(isoDate);
  const row = clinic.hours.find((h) => h.day === wd);
  if (!row) return [];

  const range = parseClinicDayRange(row.time);
  if (!range) return [];

  const { openMin, closeMin } = range;
  const step = bookingConfig.slotMinutes;
  const slots: SlotInterval[] = [];

  for (let m = openMin; m + step <= closeMin; m += step) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const slotStart = istWallTimeToUtc(isoDate, h, min);
    const slotEnd = new Date(slotStart.getTime() + step * 60_000);
    slots.push({
      slotStart,
      slotEnd,
      isoStart: slotStart.toISOString(),
    });
  }

  return slots;
}

/** Drop slots that are fully in the past (for same-day booking). */
export function filterPastSlots(slots: SlotInterval[], now = new Date()): SlotInterval[] {
  return slots.filter((s) => s.slotEnd.getTime() > now.getTime());
}

export function isWithinJoinWindow(slotStart: Date, now = new Date()): boolean {
  const { joinWindowBeforeMin, joinWindowAfterMin } = bookingConfig;
  const startMs = slotStart.getTime() - joinWindowBeforeMin * 60_000;
  const endMs = slotStart.getTime() + joinWindowAfterMin * 60_000;
  return now.getTime() >= startMs && now.getTime() <= endMs;
}
