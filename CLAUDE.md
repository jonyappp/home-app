# CLAUDE.md

AI operating rules for this template repository.

## Load order
- Read `tasks/project_stage.md` first
- Load only files relevant to the current stage and task
- Ignore inactive stub files unless their activation criteria are met

## Scope control
- Start with the thinnest useful slice
- Remove unnecessary scope before adding structure
- Do not generate speculative documentation

## Planning
- Use milestone buckets in `tasks/todo.md`
- Work one milestone slice at a time
- Each milestone should state objective, tasks, and status

## Source of truth
- Each concept must have one source of truth
- Files must not contradict each other
- If a conflict is found, resolve it across all affected files

## Documentation updates
- Update docs only when behaviour or contracts change materially
- Update architecture docs when architecture changes
- Update data model docs when the schema changes
- Update API docs when contracts change
- Update auth docs when auth flows change

## Execution
- Prefer simple, testable changes
- Validate the current slice before expanding scope
- Record repeatable mistakes and guardrails in `tasks/lessons.md`
- Record important decisions in `decisions/decision_log.md`

## Escalation
- If repository complexity exceeds the current stage, propose updating `tasks/project_stage.md` before expanding documentation
