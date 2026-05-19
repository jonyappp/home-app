# AI App Template

A minimal template for building apps with staged documentation and controlled expansion.

## Workflow

1. Define the project in `project_brief.md`.
2. Check `tasks/project_stage.md` to see which files are active.
3. Start with the first thin vertical slice.
4. Track implementation in `tasks/todo.md`.
5. Update `docs/project_context.md` as the system meaningfully evolves.

## File Roles

* `README.md` → human-facing guide for using the template.
* `CLAUDE.md` → AI operating instructions.
* `docs/project_context.md` → durable snapshot of the current project.
* `tasks/todo.md` → milestone-based execution tracker.
* `tasks/project_stage.md` → activation controller for repository files.

## How staging works

* Not all files are active at once.
* Files become relevant as the project grows.
* Early-stage projects should avoid over-documentation.
* Stub files stay minimal until their activation criteria are met.

## Recommended setup sequence

### 1. Define the product

Write `project_brief.md` with the problem, target user, outcome, scope, constraints, and success criteria.

### 2. Confirm the current stage

Read `tasks/project_stage.md` and use only the active files for that stage.

### 3. Plan the first thin slice

Create the first milestone in `tasks/todo.md` and keep it small enough to validate the core workflow quickly.

### 4. Build and verify

Implement one milestone at a time. Update active documentation only when the system meaningfully changes.

### 5. Expand only when triggered

Activate architecture, contracts, tests, runbooks, or integration notes only when the project has earned that complexity.
