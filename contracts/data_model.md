# Data Model Contract

Status: Active. H2A has introduced the initial schema.

## Source-of-truth stance

Home App must sync across both phones. Browser-only local storage is not an acceptable source of truth.

Allowed:
- Supabase Postgres (server database, hosted)
- local cache backed by Supabase

Not allowed as source of truth:
- browser-only localStorage
- hard-coded JSON
- in-memory-only state

---

## H2 schema

See `supabase/migrations/0001_home_tasks.sql` for authoritative DDL.

### households

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| name | text | not null |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), auto-updated |

### household_members

| Field | Type | Notes |
|---|---|---|
| household_id | uuid FK | references households |
| user_id | uuid | Supabase Auth user id |
| created_at | timestamptz | |
| PK | household_id + user_id | composite |

### tasks

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| household_id | uuid FK | references households |
| title | text | not null, not empty (trimmed) |
| notes | text | nullable |
| task_type | text | 'recurring' or 'one_off' |
| due_date | date | date-only; nullable for one-off tasks with no date |
| recurrence_frequency | text | 'none', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly' |
| recurrence_interval | int | default 1, must be positive |
| is_archived | boolean | default false |
| created_at | timestamptz | |
| updated_at | timestamptz | auto-updated |

Constraints:
- recurring tasks must have `due_date not null` and `recurrence_frequency != 'none'`
- `recurrence_interval` must be positive
- `title` (trimmed) must not be empty

**Design note:** Recurrence fields are embedded on `tasks` for H2. A separate `recurrence_rules` table was considered and rejected — the current rules are simple and the join complexity is not justified yet. Revisit if custom recurrence patterns are needed beyond the six frequency options.

### task_completion_events

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| task_id | uuid FK | references tasks |
| completed_for_date | date | the due date this completion covers |
| completed_at | timestamptz | when the user marked it done |
| notes | text | nullable |
| created_at | timestamptz | |
| UNIQUE | task_id + completed_for_date | one completion per task per date |

---

## Derived values

These must be derived, never stored as database truth:

| Value | How derived |
|---|---|
| next due date | task.due_date + recurrence + completion history |
| overdue | effective_due_date < today |
| due_soon | effective_due_date within 7 days |
| scheduled | effective_due_date > 7 days away |
| no_due_date | task has no due_date |

See `src/lib/tasks/due-state.ts` for the derivation logic.
See `src/lib/date/household-date.ts` for date utilities.

---

## Recipe entities (planned H4)

### Recipe

Fields to consider:
- `id`, `household_id`, `name`, `status` (tried/want_to_try), `base_pax`, `prep_time_label`, `notes`, `rating`, `created_at`, `updated_at`

### Recipe ingredient

Fields to consider:
- `id`, `recipe_id`, `name`, `quantity`, `unit`, `sort_order`

### Recipe tag

Fields to consider:
- `id`, `name`, `type` (cuisine/protein/meal/time/custom)

### Recipe image

Fields to consider:
- `id`, `recipe_id`, `image_type` (dish_photo/recipe_card), `storage_path`, `created_at`

Scaled ingredient quantities derive from `base_pax` and selected pax — stored quantities are not overwritten.

---

## Data trust rules

- Do not fabricate task or recipe rows.
- Do not silently drop failed writes.
- Mutations should be auditable enough for debugging.
- Destructive actions require confirmation.
- Backup/export must be added before the app becomes relied upon (H6).
