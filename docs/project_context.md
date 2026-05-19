# Project Context

## TL;DR

Active milestone: **H2 - Home Tasks foundation**.

Home App is a private household app for Jon and CY. v1 uses one shared household login, syncs across both phones, starts with Home Tasks, and adds Recipes after Home Tasks is reliable.

Immediate next step: **H2C - Home Tasks list UI with loading/empty/error/populated states.** H2B is complete with recurrence edge-case tests and deterministic month-end and leap-year due-date logic.

Stop reading here unless you need constraints or canonical references.

## Product overview

Home App helps Jon and CY manage recurring household tasks and personal recipes in one shared mobile-first app.

## Current stage

Current stage: **Core**.

H1 is complete. H2 is active. H2A and H2B are complete. The repo remains Core until a working persisted Home Tasks flow is implemented and exercised.

## Recently decided

- Architecture: Next.js 16 App Router + Supabase Postgres + Supabase Auth.
- Styling: Tailwind CSS v4 with design tokens from `design/product_ui_system.md`.
- Deployment direction: Vercel + Supabase hosted.
- Recurrence embedded on `tasks` table (no separate `recurrence_rules` table for H2).
- Auth implementation deferred to H3. RLS skeleton is in the migration.
- Data access: Server Components for reads, Server Actions for writes.
- One shared household login for v1.
- Data must sync across both phones.
- Home Tasks is the first implementation slice.
- Browser-only local storage is not acceptable as the source of truth.
- Month/year recurrence uses deterministic day clamping (for example 31 Jan -> 28/29 Feb).

## Current constraints and risks

- There must be exactly one ACTIVE milestone in `tasks/todo.md`.
- Mobile-first means 375px checks are required for UI implementation work.
- Shared sync means persistence must be server-side or shared, not local-only.
- Recurring task status must be derived from recurrence and completion history.
- The v0 HTML prototype is a design reference, not production-ready code.
- Do not implement Recipes before the Home Tasks data model and workflow are reliable.
- H3 auth must be in place before real household data is exposed in production.

## Canonical references

| What | Where |
|---|---|
| Repo workflow | `AGENTS.md` |
| Product scope and non-goals | `project_brief.md` |
| Active roadmap | `tasks/todo.md` |
| Stage activation | `tasks/project_stage.md` |
| UI system | `design/product_ui_system.md` |
| Product UI spec | `design/ui_spec.md` |
| Durable decisions | `decisions/decision_log.md` |
| Architecture | `architecture.md` |
| Data model | `contracts/data_model.md` |
| Auth model | `contracts/auth_model.md` |
| API contracts | `contracts/api_contracts.md` |
| Test plan | `tasks/test_plan.md` |