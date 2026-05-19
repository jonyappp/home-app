# Project Context

## TL;DR

Active milestone: **H2 - Home Tasks foundation**.

Home App is a private household app for Jon and CY. v1 uses one shared household login, syncs across both phones, starts with Home Tasks, and adds Recipes soon after.

Immediate next step: answer the H2 architecture questions, record the decisions, then build the smallest shared Home Tasks slice.

Stop reading here unless you need constraints or canonical references.

## Product overview

Home App helps Jon and CY manage recurring household tasks and personal recipes in one shared mobile-first app.

## Current stage

Current stage: **Core**.

H1 is complete. H2 is starting. The repo remains Core until implementation decisions are made. H2 is expected to trigger the MVP stage once persistence, auth, and shared deployment are introduced.

## Recently decided

- One shared household login is enough for v1.
- Data must sync across both phones.
- Home Tasks is the first implementation slice.
- Recipes should follow soon after Home Tasks.
- Browser-only local storage is not acceptable as the source of truth.

## Current constraints and risks

- There must be exactly one ACTIVE milestone in `tasks/todo.md`.
- Mobile-first means 375px checks are required for UI implementation work.
- Shared sync means persistence must be server-side or shared, not local-only.
- Recurring task status must be derived from recurrence and completion history.
- The v0 HTML prototype is a design reference, not production-ready code.
- Do not implement Recipes before the Home Tasks data model and workflow are reliable.

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
| Architecture, once implementation exists | `architecture.md` |
| Data model, once persistence begins | `contracts/data_model.md` |
| Auth model, once auth begins | `contracts/auth_model.md` |
