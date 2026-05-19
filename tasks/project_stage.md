# Project Stage

## Current Stage

Core

## Stage Definitions

### Core

Goal:
- Define the product clearly.
- Harden the repo workflow.
- Convert the v0 prototype into implementation-ready product guidance.
- Prepare the first thin vertical slice without overbuilding.

Active files:
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `project_brief.md`
- `tasks/project_stage.md`
- `tasks/todo.md`
- `tasks/lessons.md`
- `decisions/decision_log.md`
- `docs/project_context.md`
- `design/product_ui_system.md`
- `design/ui_spec.md`

Conditionally active:
- `architecture.md` when implementation structure, persistence, routing, auth, or deployment is being planned.
- `contracts/data_model.md` when persistence is introduced.
- `contracts/auth_model.md` when shared household login is introduced.
- `contracts/api_contracts.md` when API routes are introduced.
- `tasks/test_plan.md` when implementation begins.

Inactive until triggered:
- `runbooks/*`
- `docs/integration_notes.md`
- `docs/repo_map.md`

---

### MVP

Goal:
- Support real Home Tasks and Recipe workflows reliably.
- Introduce persistence, auth, and tests where needed.
- Support shared sync across both phones.

Always active:
- All Core files
- `architecture.md`
- `tasks/test_plan.md`
- `contracts/data_model.md`
- `contracts/auth_model.md`

Conditionally active:
- `contracts/api_contracts.md` if API routes exist.
- `runbooks/deploy.md` if deployed.
- `runbooks/backup_restore.md` once real household data is persisted.

---

### Scale

Goal:
- Improve maintainability, debuggability, extensibility, and recovery.

Active:
- All MVP files
- `tasks/assumptions.md`
- `tasks/risks.md`
- `runbooks/debugging.md`
- `docs/repo_map.md`

Conditionally active:
- `runbooks/rollback.md` if production deployment risk exists.
- `docs/integration_notes.md` if external integrations are introduced.

---

## Stage Transition Triggers

Core → MVP when any 2 are true:
- Persistent storage introduced
- Shared household auth introduced
- Deployed shared backend introduced
- Home Tasks workflow implemented
- Recipes workflow implemented

MVP → Scale when any 2 are true:
- Multiple major workflows are live
- Production deployment is used regularly
- Debugging complexity increases
- Data migration or backup/restore risk becomes real
- More than one integration or background job exists

## Current stage note

H2 Home Tasks foundation is expected to trigger MVP because it will likely introduce persistence, shared login, and cross-phone sync.
