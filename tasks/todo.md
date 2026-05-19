# Tasks

This file is the single active roadmap.

Roadmap rules:
- Exactly one milestone may be marked `ACTIVE`.
- Work one milestone slice at a time.
- Each milestone must include objective, tasks, exit criteria, verification, and status.
- After completing a milestone, suggest the next milestone or slice.
- Keep completed detail concise. Archive only when this file becomes hard to scan.

---

## Completed Milestones

## Milestone H1 - Repo hardening and v1 definition (COMPLETE)

Objective: turn the generic app template into a disciplined Home App repo with clear product scope, source-of-truth rules, UI guidance, and implementation milestones.

All tasks complete. Exit criteria met. No production feature code added.

---

## Active Milestone

## Milestone H2 - Home Tasks foundation (ACTIVE)

Objective: build the first working shared Home Tasks slice with persistence, shared login assumptions, and due-state correctness.

Feature concept:
- View task list grouped by status.
- Add recurring task.
- Add one-off task.
- Mark task done.
- Derive next due date from recurrence and completion history.
- Persist data in a shared source of truth.
- Confirm data can sync across both phones through the chosen deployment/persistence model.

Slices:
- [x] H2A: Architecture decision and Next.js + Supabase bootstrap
- [ ] H2B: Home Tasks schema and due-state domain logic
- [ ] H2C: Home Tasks list UI with loading/empty/error/populated states
- [ ] H2D: Add task and mark done flows
- [ ] H2E: Cross-phone persistence verification and H2 cleanup

Acceptance criteria:
- User can see overdue, due soon, scheduled, and no-date tasks.
- User can add a recurring task from mobile.
- User can mark a task done from mobile.
- Completing a recurring task creates a completion event and updates next due date.
- Derived status reconciles with source recurrence and completion history.
- Refreshing the browser does not lose data.
- Data model does not depend on browser-only local storage.
- 375px mobile layout has no primary horizontal scrolling.
- Empty, loading, error, and populated states exist.

Verification:
- Run available automated checks.
- Smoke test mobile 375px Home Tasks flow.
- Smoke test desktop Home Tasks flow.
- Verify one task completion updates due state correctly.
- Verify refresh preserves data.
- Document any unavailable checks.

Status:
- Active

---

## Planned Upcoming Milestones

## Milestone H3 - Shared household login and deployment hardening (PLANNED)

Objective: make v1 safe enough for shared use by Jon and CY across both phones.

Feature concept:
- One shared household login.
- Session persistence suitable for mobile web/PWA.
- Basic deployed configuration documented.
- No sensitive household data exposed without login.
- Clear handling of logged-out, expired-session, and failed-login states.

Acceptance criteria:
- Shared login protects app data.
- Session works on both mobile browser and installed PWA where applicable.
- Logged-out user cannot access protected app data.
- Failed login has clear inline feedback.
- Auth assumptions are documented in `contracts/auth_model.md`.
- No secret is committed.

Verification:
- Run available auth tests or smoke checks.
- Verify protected route behaviour manually.
- Verify mobile login flow.
- Verify no secrets in repo diff.

---

## Milestone H4 - Recipes foundation (PLANNED)

Objective: add the first reliable Recipe Library slice after Home Tasks is working.

Feature concept:
- Browse recipes.
- Add recipe.
- View recipe detail.
- Store tried/want-to-try status.
- Store tags.
- Store notes.
- Store base pax and ingredients.
- Scale ingredient quantities by pax.

Acceptance criteria:
- User can add a recipe from mobile.
- User can browse saved recipes.
- User can open recipe detail.
- User can change tried/want-to-try status.
- Pax scaling is deterministic and based on base servings.
- Recipe data persists and syncs across phones.
- Empty and error states exist.
- 375px layout has no primary horizontal scrolling.

Verification:
- Run available automated checks.
- Smoke test mobile recipe add and detail flow.
- Verify refresh preserves recipe data.
- Verify pax scaling against at least 2 examples.

---

## Milestone H5 - Recipe cook mode and images (PLANNED)

Objective: add the high-friction cooking helpers after recipe CRUD is reliable.

Feature concept:
- Cook mode.
- Optional dish photo.
- Optional recipe-card image.
- Screen-stays-on behaviour if feasible.
- Edit notes after cooking.

Acceptance criteria:
- User can enter and exit cook mode.
- Important recipe information is readable while cooking.
- Image absence is handled gracefully.
- No external image dependency is required for core workflow.
- Mobile interaction remains thumb-friendly.

Verification:
- Smoke test mobile cook mode.
- Verify no broken image layout.
- Verify exit is always visible and tappable.

---

## Milestone H6 - Backup, export, and recovery (PLANNED)

Objective: protect household data before the app becomes relied upon.

Feature concept:
- Export household data.
- Import household data.
- Basic backup/restore runbook.
- Safe handling of destructive actions.

Acceptance criteria:
- User can export data to a portable file.
- User can restore from export in a safe flow.
- Destructive data actions require confirmation.
- Backup/restore process is documented.
- Import does not silently corrupt existing data.

Verification:
- Export sample data.
- Restore into clean state if supported.
- Verify restored tasks and recipes match source data.
