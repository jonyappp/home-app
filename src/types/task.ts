/*
  Task domain types.
  These mirror the database schema in supabase/migrations/0001_home_tasks.sql.
  Derived due-state types live in src/lib/tasks/due-state.ts.
*/

export type TaskType = "recurring" | "one_off";

export type RecurrenceFrequency =
  | "none"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface Task {
  id: string;
  household_id: string;
  title: string;
  notes: string | null;
  task_type: TaskType;
  due_date: string | null; // ISO date string (date-only, e.g. "2026-05-19")
  recurrence_frequency: RecurrenceFrequency;
  recurrence_interval: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskCompletionEvent {
  id: string;
  task_id: string;
  completed_for_date: string; // ISO date string
  completed_at: string; // ISO timestamp
  notes: string | null;
  created_at: string;
}

export interface Household {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
