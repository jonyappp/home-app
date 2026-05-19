# AGENTS.md - Home App

Role: act as Jon's execution partner for production-quality personal app work.

## Instruction priority
- This file is the canonical repo workflow.
- If this conflicts with `CLAUDE.md`, follow this file.
- If unsure, ask one sharp question or state a clear assumption and proceed.

## Session start
- Read `tasks/project_stage.md`.
- Read `docs/project_context.md`.
- Read `tasks/todo.md`.
- Stop reading completed historical detail unless the task requires it.
- Read `architecture.md` only when implementation structure, persistence, auth, sync, or routing is involved.
- Read `design/ui_spec.md` and `design/product_ui_system.md` before UI work.
- Open only files relevant to the active milestone or task.

## Surgical session start
Use this for single-file fixes, copy edits, or isolated docs updates:
- Read `AGENTS.md`.
- Read only the target file and any directly referenced source of truth.
- Skip broader context unless ambiguity affects correctness.

## Working principles
- Use British English.
- Be concise, direct, and critical.
- Prefer simple, modular, testable changes.
- Work one milestone slice at a time.
- Start from the smallest useful working slice.
- Delete unnecessary scope before adding structure.
- Do not claim behaviour works without verification.
- If implementation gets messy, stop and re-plan instead of layering patches.

## Roadmap discipline
- `tasks/todo.md` is the single active roadmap.
- There must be exactly one milestone marked `ACTIVE`.
- Planned milestones must stay concise.
- Each milestone must include objective, tasks, exit criteria, verification, and status.
- When a slice or task is complete, tick it in `tasks/todo.md` in the same change.
- After completing each milestone, suggest the next milestone or slice.

## Documentation discipline
- Update docs only when behaviour, contracts, architecture, scope, or constraints materially change.
- Update `docs/project_context.md` when active milestone, scope, architecture, constraints, or immediate next step changes.
- Update `decisions/decision_log.md` for durable trade-off decisions.
- Update `tasks/lessons.md` when a user correction, repeated mistake, or durable guardrail appears.
- Update `architecture.md` when implementation structure becomes real.
- Update contract files when persistence, API, or auth contracts are introduced or changed.

## Product stance
- Home App is a private household web app for Jon and CY.
- v1 uses one shared household login.
- v1 must sync across both phones.
- The source of truth must be server-side or shared persistent storage, not browser-only local storage.
- Browser storage may only be used as cache or draft state.
- Mobile web/PWA is the primary surface.
- Desktop should remain usable but is secondary.

## Data trust rules
- Recurring task due state must be derived from recurrence rules and completion history.
- Do not store derived labels like `overdue` as the source of truth unless explicitly cached with invalidation.
- Destructive actions must be reversible or confirmed.
- Any synced/shared data must have clear loading, empty, error, stale, partial, and populated states where relevant.
- Do not fabricate rows, tasks, recipes, dates, or user data.

## UI rules
- Mobile-first at 375px.
- Minimum practical touch target: 44px.
- No primary workflow should require horizontal scrolling at 375px.
- Use progressive disclosure for detail.
- Use bottom sheets or dedicated screens for dense mobile detail.
- Every interactive element needs affordance, feedback, and clear mapping.
- Forms need loading, success, and inline error states.
- Destructive actions require confirmation.
- Do not rely on hover-only behaviour.
- Do not use external icon CDNs in production.
- Do not use emoji as production UI icons.
- Prefer inline SVG icons with `currentColor`.
- Avoid inline typography in production markup. Use CSS classes or tokens.

## Build and verification commands

Confirmed after H2A bootstrap (Next.js 16, Tailwind v4, Supabase):

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build + TypeScript check
npm run start        # serve the production build (run build first)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

For every implementation change, run the strongest relevant available check:
- Code changes: `npm run build` (includes TypeScript) + `npm run lint`
- UI changes: also perform or document a smoke test covering:
  - affected screen or route
  - 375px mobile viewport
  - desktop sanity check
  - no blank screen
  - no obvious layout overflow
  - no console/runtime errors where a browser is available
  - loading, empty, error, and populated states where relevant

## Definition of done
- Scope stayed within the active milestone.
- Relevant files were inspected before editing.
- Source of truth is clear.
- State and data flow are documented where relevant.
- Relevant docs were updated.
- Checks or smoke tests were run, or unavailable checks were explicitly stated.
- The diff is small, understandable, and reversible.
- Completion notes include files changed, checks run, untested items, and recommended next step.
