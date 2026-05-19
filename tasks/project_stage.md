# Project Stage

## Current Stage

Core

## Stage Definitions

### Core

Goal:

* Define the product clearly
* Build first thin vertical slice
* Avoid unnecessary abstraction

Active files:

* CLAUDE.md
* README.md
* project_brief.md
* tasks/todo.md
* tasks/lessons.md
* decisions/decision_log.md
* docs/project_context.md

Conditionally active:

* architecture.md
* design/ui_spec.md

Inactive (stub until triggered):

* contracts/*
* tasks/test_plan.md
* tasks/assumptions.md
* tasks/risks.md
* runbooks/*
* docs/integration_notes.md

---

### MVP

Goal:

* Support real user workflows reliably
* Introduce contracts and tests where needed

Always active:

* All Core files
* tasks/test_plan.md

Conditionally active:

* contracts/data_model.md (if persistence exists)
* contracts/api_contracts.md (if external APIs exist)
* contracts/auth_model.md (if auth exists)
* architecture.md (if more than 3 components exist)

---

### Scale

Goal:

* Improve maintainability, debuggability, extensibility

Active:

* All MVP files
* architecture.md
* tasks/assumptions.md
* tasks/risks.md
* runbooks/debugging.md
* docs/repo_map.md

Conditionally active:

* runbooks/deploy.md (if deployed)
* runbooks/rollback.md (if production risk exists)
* docs/integration_notes.md (if integrations have quirks)

---

## Stage Transition Triggers

Core → MVP (any 2):

* Persistent storage introduced
* External API integration introduced
* Auth introduced
* Multiple workflows exist

MVP → Scale (any 2):

* Multiple integrations
* Multiple major features
* Production deployment
* Debugging complexity increasing
