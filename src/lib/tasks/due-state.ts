/*
  Due-state derivation for Home Tasks.

  Rule: due state is DERIVED, never stored as a source-of-truth field in the DB.
  Inputs: task fields + completion history + current date (explicit, not server clock).

  DueState values:
  - "overdue"     : due date is in the past and not completed for that date
  - "due_soon"    : due date is today or within 7 days
  - "scheduled"   : due date is more than 7 days away
  - "no_due_date" : task has no due date (typically one-off tasks)
*/

import type { Task, TaskCompletionEvent } from "@/types/task";
import type { RecurrenceFrequency } from "@/types/task";
import {
  isBeforeToday,
  isWithinDays,
  compareIsoDates,
  addDays,
  addMonths,
  addYears,
} from "@/lib/date/household-date";

export type DueState = "overdue" | "due_soon" | "scheduled" | "no_due_date";

export interface DueStateResult {
  state: DueState;
  /** The effective due date used to derive the state. Null if no_due_date. */
  effectiveDueDate: string | null;
}

/** Days ahead that qualify as "due soon". */
const DUE_SOON_DAYS = 7;

/**
 * Derive the due state for a task given its completion history and today's date.
 *
 * @param task - Task record from the database.
 * @param completions - All completion events for this task.
 * @param today - Today's ISO date string (e.g. "2026-05-19"). Caller supplies this.
 */
export function deriveDueState(
  task: Task,
  completions: TaskCompletionEvent[],
  today: string
): DueStateResult {
  if (!task.due_date) {
    return { state: "no_due_date", effectiveDueDate: null };
  }

  const effectiveDueDate = getEffectiveDueDate(task, completions);

  if (!effectiveDueDate) {
    return { state: "no_due_date", effectiveDueDate: null };
  }

  if (isBeforeToday(effectiveDueDate, today)) {
    return { state: "overdue", effectiveDueDate };
  }

  if (isWithinDays(effectiveDueDate, today, DUE_SOON_DAYS)) {
    return { state: "due_soon", effectiveDueDate };
  }

  return { state: "scheduled", effectiveDueDate };
}

/**
 * Compute the next due date for a task, accounting for completions.
 *
 * For one-off tasks: returns the task's due_date if not yet completed for that date.
 * For recurring tasks: advances from the last completion or original due_date
 * until the next date that has no completion event.
 *
 * TODO (H2B): validate this against real recurrence scenarios.
 */
export function getEffectiveDueDate(
  task: Task,
  completions: TaskCompletionEvent[]
): string | null {
  if (!task.due_date) return null;

  if (task.task_type === "one_off") {
    const completedDates = new Set(completions.map((c) => c.completed_for_date));
    return completedDates.has(task.due_date) ? null : task.due_date;
  }

  // Recurring: find the first due date (from original anchor) with no completion.
  const completedDates = new Set(completions.map((c) => c.completed_for_date));
  let candidate = task.due_date;

  // Safety limit: max 500 iterations to avoid infinite loops on bad data.
  for (let i = 0; i < 500; i++) {
    if (!completedDates.has(candidate)) return candidate;
    const next = advanceByInterval(
      candidate,
      task.recurrence_frequency,
      task.recurrence_interval
    );
    if (!next || compareIsoDates(next, candidate) <= 0) break;
    candidate = next;
  }

  return candidate;
}

/** Advance an ISO date string by one recurrence interval. */
function advanceByInterval(
  isoDate: string,
  frequency: RecurrenceFrequency,
  interval: number
): string | null {
  switch (frequency) {
    case "daily":
      return addDays(isoDate, interval);
    case "weekly":
      return addDays(isoDate, interval * 7);
    case "monthly":
      return addMonths(isoDate, interval);
    case "quarterly":
      return addMonths(isoDate, interval * 3);
    case "yearly":
      return addYears(isoDate, interval);
    case "none":
      return null;
    default:
      return null;
  }
}
