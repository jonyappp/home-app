# Architecture

## Status

Active. H2A has introduced a real implementation stack.

---

## Chosen stack

| Concern | Choice |
|---|---|
| Frontend | Next.js 16 App Router, TypeScript, React 19 |
| Styling | Tailwind CSS v4 with Home App design tokens |
| Persistence | Supabase Postgres (hosted) |
| Auth direction | Supabase Auth — one shared household account |
| Deployment direction | Vercel (app) + Supabase hosted (database/auth/storage) |
| Package manager | npm |

---

## Source-of-truth rules

- Supabase Postgres is the source of truth for all household data.
- Browser storage (localStorage, sessionStorage) may only be used as cache or draft state, never source of truth.
- Due state (`overdue`, `due_soon`, `scheduled`, `no_due_date`) is always derived from task fields, recurrence, completion history, and current date. These values are not stored in the database.

---

## Time and date stance

- Due dates are date-only values (`YYYY-MM-DD`). No time component.
- "Today" is always passed explicitly as a parameter — never derived from server timezone assumptions.
- The household timezone is Singapore (SGT, UTC+8). See `src/lib/date/household-date.ts`.

---

## Data access approach (H2)

- Server Components read data via the server Supabase client (`src/lib/supabase/server.ts`).
- Writes use Server Actions.
- No custom Route Handlers in H2 — direct Supabase client access is sufficient.
- RLS is enabled on all tables. Policies will be tested end-to-end in H3.

---

## Auth stance (H2A)

- Auth implementation is deferred to H3.
- The migration enables RLS and scaffolds membership-based policies.
- H2 development should use a local Supabase project or mock data. Real household data should not be exposed without auth.

---

## Folder structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          root layout
│   │   ├── page.tsx            Home screen placeholder
│   │   └── globals.css         Tailwind + design tokens
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       browser-safe Supabase client
│   │   │   └── server.ts       server-only Supabase client (SSR)
│   │   ├── tasks/
│   │   │   └── due-state.ts    due-state derivation logic
│   │   └── date/
│   │       └── household-date.ts  date utilities (date-only, timezone-explicit)
│   └── types/
│       └── task.ts             shared TypeScript types
├── supabase/
│   └── migrations/
│       └── 0001_home_tasks.sql  initial schema
├── contracts/                  data, auth, API contracts
├── decisions/                  durable decision log
├── design/                     UI system and spec
├── docs/                       project context
└── tasks/                      roadmap, test plan, lessons
```

---

## H2A limitations

- No Supabase project connected — migration is SQL-only, not applied to a live database.
- Auth is scaffolded but not implemented. RLS policies are in the migration; enforcement is H3.
- No real task data — placeholder home page only.
- Supabase service role key is not wired up; not needed until H2 admin operations.
- No deployment configured yet (Vercel + Supabase setup is H3).
