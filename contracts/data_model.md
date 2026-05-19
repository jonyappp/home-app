# Data Model Contract

Status: Conditionally active. Becomes active when H2 introduces persistence.

## Source-of-truth stance

Home App must sync across both phones. Browser-only local storage is not an acceptable source of truth.

Allowed:
- server database
- managed backend database
- local cache backed by shared persistence

Not allowed as source of truth:
- browser-only localStorage
- hard-coded JSON
- in-memory-only state

## Core entities planned for H2

### Household

Represents the shared household workspace.

Fields to consider:
- `id`
- `name`
- `created_at`
- `updated_at`

### Shared user/session

v1 uses one shared household login.

Fields depend on auth implementation, but must support:
- login identity
- password/session secret storage outside source control
- session expiry

### Home task

Represents the task definition.

Fields to consider:
- `id`
- `household_id`
- `title`
- `notes`
- `task_type`: recurring or one_off
- `due_date`
- `recurrence_rule_id`
- `is_archived`
- `created_at`
- `updated_at`

### Recurrence rule

Represents how a recurring task repeats.

Fields to consider:
- `id`
- `frequency`: daily, weekly, monthly, quarterly, yearly, custom
- `interval`
- `anchor_date`
- `end_date`
- `created_at`
- `updated_at`

### Task completion event

Represents actual completion history.

Fields to consider:
- `id`
- `task_id`
- `completed_at`
- `completed_for_date`
- `notes`
- `created_at`

## Derived values

These must be derived, not treated as primary truth:
- next due date
- overdue status
- due soon status
- scheduled status
- completion streaks if ever added

Derived status should reconcile with:
- task definition
- recurrence rule
- completion history
- current date

## Recipe entities planned for H4

### Recipe

Fields to consider:
- `id`
- `household_id`
- `name`
- `status`: tried or want_to_try
- `base_pax`
- `prep_time_label`
- `notes`
- `rating`
- `created_at`
- `updated_at`

### Recipe ingredient

Fields to consider:
- `id`
- `recipe_id`
- `name`
- `quantity`
- `unit`
- `sort_order`

### Recipe tag

Use controlled tags where practical.

Fields to consider:
- `id`
- `name`
- `type`: cuisine, protein, meal, time, custom

### Recipe image

Fields to consider:
- `id`
- `recipe_id`
- `image_type`: dish_photo or recipe_card
- `storage_path`
- `created_at`

## Recipe derived values

- scaled ingredient quantities derive from base pax and selected pax
- tried/want-to-try status is stored truth
- filters derive from tags and status

## Data trust rules

- Do not fabricate task or recipe rows.
- Do not silently drop failed writes.
- Mutations should be auditable enough for debugging.
- Destructive actions require confirmation.
- Backup/export must be added before the app becomes relied upon.
