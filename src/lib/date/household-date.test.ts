import { describe, expect, it } from "vitest";

import { addMonths, addYears, clampDayToMonth, daysInMonth } from "./household-date";

describe("household-date recurrence helpers", () => {
  it("returns days in month correctly", () => {
    expect(daysInMonth(2026, 2)).toBe(28);
    expect(daysInMonth(2028, 2)).toBe(29);
    expect(daysInMonth(2026, 4)).toBe(30);
  });

  it("clamps day to month max", () => {
    expect(clampDayToMonth(2026, 2, 31)).toBe(28);
    expect(clampDayToMonth(2028, 2, 31)).toBe(29);
    expect(clampDayToMonth(2026, 5, 15)).toBe(15);
  });

  it("handles month-end recurrence deterministically", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2028-01-31", 1)).toBe("2028-02-29");
    expect(addMonths("2026-03-31", 1)).toBe("2026-04-30");
  });

  it("handles leap-year recurrence deterministically", () => {
    expect(addYears("2024-02-29", 1)).toBe("2025-02-28");
    expect(addYears("2024-02-29", 4)).toBe("2028-02-29");
  });
});
