# API Contracts

Status: Conditionally active. Becomes active when API routes are introduced.

## Contract rules

- API responses should be predictable and typed/documented.
- Mutations must return enough data for UI to reconcile state.
- Errors must be explicit enough for useful inline UI feedback.
- Do not expose household data without authentication once auth exists.

## Planned Home Tasks API shape

Exact routes depend on stack. Expected capabilities:

- list tasks
- create task
- update task
- archive/delete task
- mark task complete
- list completion history

## Planned Recipes API shape

Exact routes depend on stack. Expected capabilities:

- list recipes
- create recipe
- update recipe
- archive/delete recipe
- upload or reference image
- update recipe status
