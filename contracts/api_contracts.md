# API Contracts

Status: Active. H2A has chosen the data access approach.

## Chosen approach (H2)

| Operation type | Mechanism |
|---|---|
| Reads | Server Components reading via `src/lib/supabase/server.ts` |
| Writes | Next.js Server Actions |
| Client-side reads | Supabase browser client (`src/lib/supabase/client.ts`) where needed for interactive UI |
| No Route Handlers | Not used in H2 — direct Supabase client access is sufficient |

Rationale: Server Actions are the simplest write path in the Next.js App Router. They avoid the overhead of custom Route Handlers for H2's straightforward CRUD. Revisit if a public API or webhook endpoint is needed.

## Contract rules

- API responses should be predictable and typed/documented.
- Mutations must return enough data for UI to reconcile state.
- Errors must be explicit enough for useful inline UI feedback.
- Do not expose household data without authentication once auth exists (H3).

## Planned Home Tasks operations (H2C/H2D)

- list tasks — Server Component, Supabase server client, ordered by derived due state
- create task — Server Action, validates type + recurrence constraints
- update task — Server Action
- archive/delete task — Server Action, requires confirmation in UI
- mark task complete — Server Action, inserts `task_completion_events` row
- list completion history — Server Component or browser client for task detail

## Planned Recipes operations (H4)

- list recipes — Server Component
- create recipe — Server Action
- update recipe — Server Action
- archive/delete recipe — Server Action
- update recipe status — Server Action
- image handling — Supabase Storage, approach TBD in H5
