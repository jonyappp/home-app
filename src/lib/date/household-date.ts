/*
  Date utilities for the household context.

  Design rule: due dates are date-only values (YYYY-MM-DD).
  "Today" must be passed explicitly — never derived from server timezone assumptions.
  The household is in Singapore (SGT, UTC+8), but callers supply the date.

  All functions operate on ISO date strings ("YYYY-MM-DD") to avoid
  timezone ambiguity from Date objects.
*/

/** Return today's date as an ISO date string in a given IANA timezone. */
export function getTodayInTimezone(timeZone = "Asia/Singapore"): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

/** Parse an ISO date string ("YYYY-MM-DD") into its numeric parts. */
export function parseIsoDate(
  isoDate: string
): { year: number; month: number; day: number } {
  const [year, month, day] = isoDate.split("-").map(Number);
  return { year, month, day };
}

/** Compare two ISO date strings. Returns negative, zero, or positive. */
export function compareIsoDates(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Return true if isoDate is before today (overdue). */
export function isBeforeToday(isoDate: string, today: string): boolean {
  return compareIsoDates(isoDate, today) < 0;
}

/** Return true if isoDate is today. */
export function isToday(isoDate: string, today: string): boolean {
  return isoDate === today;
}

/** Return true if isoDate is within the next N days (inclusive of today). */
export function isWithinDays(
  isoDate: string,
  today: string,
  days: number
): boolean {
  const { year, month, day } = parseIsoDate(today);
  const limit = new Date(Date.UTC(year, month - 1, day + days));
  const limitStr = limit.toISOString().slice(0, 10);
  return compareIsoDates(isoDate, today) >= 0 && compareIsoDates(isoDate, limitStr) <= 0;
}

/** Add a given number of days to an ISO date string and return the result. */
export function addDays(isoDate: string, days: number): string {
  const { year, month, day } = parseIsoDate(isoDate);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return result.toISOString().slice(0, 10);
}

/** Add a given number of months to an ISO date string and return the result. */
export function addMonths(isoDate: string, months: number): string {
  // H2B must replace or validate this with explicit month-end recurrence rules.
  // Native Date rollover can produce surprising results for month-end dates.
  const { year, month, day } = parseIsoDate(isoDate);
  const result = new Date(Date.UTC(year, month - 1 + months, day));
  return result.toISOString().slice(0, 10);
}

/** Add a given number of years to an ISO date string and return the result. */
export function addYears(isoDate: string, years: number): string {
  const { year, month, day } = parseIsoDate(isoDate);
  const result = new Date(Date.UTC(year + years, month - 1, day));
  return result.toISOString().slice(0, 10);
}
