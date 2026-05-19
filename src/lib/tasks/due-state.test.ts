import { describe, expect, it } from "vitest";

import { deriveDueState, getEffectiveDueDate } from "./due-state";
import type { Task, TaskCompletionEvent } from "@/types/task";

const TODAY = "2026-05-19";

function buildTask(overrides: Partial<Task>): Task {
  return {
    id: "task-1",
    household_id: "household-1",
    title: "Test task",
    notes: null,
    task_type: "one_off",
    due_date: null,
    recurrence_frequency: "none",
    recurrence_interval: 1,
    is_archived: false,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function completion(completedForDate: string): TaskCompletionEvent {
  return {
    id: `completion-${completedForDate}`,
    task_id: "task-1",
    completed_for_date: completedForDate,
    completed_at: "2026-01-01T00:00:00.000Z",
    notes: null,
    created_at: "2026-01-01T00:00:00.000Z",
  };
}

describe("deriveDueState", () => {
  it("returns no_due_date for one-off tasks without due date", () => {
    const task = buildTask({ task_type: "one_off", due_date: null });
    expect(deriveDueState(task, [], TODAY)).toEqual({
      state: "no_due_date",
      effectiveDueDate: null,
    });
  });

  it("returns overdue for one-off task due yesterday", () => {
    const task = buildTask({ task_type: "one_off", due_date: "2026-05-18" });
    expect(deriveDueState(task, [], TODAY).state).toBe("overdue");
  });

  it("returns due_soon for one-off task due today", () => {
    const task = buildTask({ task_type: "one_off", due_date: TODAY });
    expect(deriveDueState(task, [], TODAY).state).toBe("due_soon");
  });

  it("returns due_soon for one-off task due within seven days", () => {
    const task = buildTask({ task_type: "one_off", due_date: "2026-05-26" });
    expect(deriveDueState(task, [], TODAY).state).toBe("due_soon");
  });

  it("returns scheduled for one-off task due beyond seven days", () => {
    const task = buildTask({ task_type: "one_off", due_date: "2026-05-27" });
    expect(deriveDueState(task, [], TODAY).state).toBe("scheduled");
  });

  it("returns no_due_date for one-off task completed for due date", () => {
    const task = buildTask({ task_type: "one_off", due_date: "2026-05-19" });
    const completions = [completion("2026-05-19")];

    expect(deriveDueState(task, completions, TODAY)).toEqual({
      state: "no_due_date",
      effectiveDueDate: null,
    });
  });
});

describe("getEffectiveDueDate recurrence", () => {
  it("advances recurring monthly task after completion of current due date", () => {
    const task = buildTask({
      task_type: "recurring",
      due_date: "2026-01-31",
      recurrence_frequency: "monthly",
      recurrence_interval: 1,
    });

    expect(getEffectiveDueDate(task, [completion("2026-01-31")])).toBe("2026-02-28");
  });

  it("advances recurring weekly task by interval", () => {
    const task = buildTask({
      task_type: "recurring",
      due_date: "2026-05-01",
      recurrence_frequency: "weekly",
      recurrence_interval: 1,
    });

    const completions = [completion("2026-05-01"), completion("2026-05-08")];
    expect(getEffectiveDueDate(task, completions)).toBe("2026-05-15");
  });

  it("keeps month-end recurrence in February rather than rolling to March", () => {
    const task = buildTask({
      task_type: "recurring",
      due_date: "2026-01-31",
      recurrence_frequency: "monthly",
      recurrence_interval: 1,
    });

    expect(getEffectiveDueDate(task, [completion("2026-01-31")])).toBe("2026-02-28");
  });

  it("advances leap-day yearly recurrence to 28 Feb in non-leap years", () => {
    const task = buildTask({
      task_type: "recurring",
      due_date: "2024-02-29",
      recurrence_frequency: "yearly",
      recurrence_interval: 1,
    });

    expect(getEffectiveDueDate(task, [completion("2024-02-29")])).toBe("2025-02-28");
  });

  it("advances leap-day yearly recurrence to 29 Feb in leap years", () => {
    const task = buildTask({
      task_type: "recurring",
      due_date: "2024-02-29",
      recurrence_frequency: "yearly",
      recurrence_interval: 4,
    });

    expect(getEffectiveDueDate(task, [completion("2024-02-29")])).toBe("2028-02-29");
  });
});
