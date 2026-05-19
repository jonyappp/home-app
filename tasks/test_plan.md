# Test Plan

Status: Active. H2A has introduced the initial implementation stack.

## Testing stance

Use the strongest practical checks available for the current stack.

Do not claim behaviour works without:
- automated checks, or
- a documented manual smoke test when automation is unavailable

## Build and check commands

```bash
npm install          # install dependencies
npm run build        # Next.js production build + TypeScript check
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit (standalone type check)
npm run dev          # start dev server for manual smoke tests
```

---

## H2A verification (bootstrap)

Automated (run in CI or locally):
- [x] `npm install` — clean install, no errors
- [x] `npm run build` — compiles successfully, zero TypeScript errors
- [x] `npm run lint` — zero errors (one warning resolved)
- [x] `npm run typecheck` — passes
- [x] `.env.example` exists
- [x] `.env` and `.env.*` are in `.gitignore` (only `.env.example` is excluded from ignore)
- [x] `supabase/migrations/0001_home_tasks.sql` exists
- [x] No secrets in committed files

Manual (dev server):
- [ ] `npm run dev` starts without error — check localhost in browser (cannot run in this session)
- [ ] Placeholder Home page renders at 375px with correct design tokens — cannot verify without browser tooling in this session
- [ ] No console errors on page load

---

## H2B verification (due-state domain logic)

- Pure function tests for `deriveDueState` covering: overdue, due_soon, scheduled, no_due_date
- Edge cases: completed_for_date matching due_date, recurring task next date, date boundary at today
- Test framework to be confirmed in H2B (likely Vitest — lightweight, TS-native)

---

## H2 Home Tasks verification (H2C–H2E)

Required smoke checks:
- open Home screen
- add recurring task
- add one-off task
- mark recurring task done
- verify next due date updates correctly
- refresh page and verify data persists
- verify 375px mobile layout has no primary horizontal scrolling
- verify desktop remains usable
- verify empty state
- verify error state if backend/API fails can be simulated

Data trust checks:
- recurring status derives from recurrence and completion history
- completion creates an event
- derived status reconciles with current date

---

## H3 Auth verification

Required smoke checks:
- logged-out user cannot access app data
- shared login succeeds
- failed login shows inline error
- session survives expected mobile usage
- logout or expired session behaves safely

---

## H4 Recipes verification

Required smoke checks:
- add recipe
- open recipe detail
- edit recipe status
- add ingredients
- change pax and verify scaled quantities
- refresh and verify persistence
- verify 375px mobile layout

---

## General UI checks

For every UI change:
- check affected flow at 375px width
- check desktop sanity
- check no blank screen
- check no obvious overflow
- check keyboard behaviour for forms
- check loading, empty, error, and populated states where relevant
