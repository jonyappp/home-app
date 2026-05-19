# Architecture

## Status

Conditionally active.

Architecture becomes active when H2 starts implementation because Home Tasks will likely introduce persistence, shared auth, and cross-phone sync.

## Current architecture stance

No production architecture has been chosen yet.

Known constraints:
- Mobile web/PWA primary.
- Desktop secondary.
- One shared household login for v1.
- Shared persistence required for cross-phone sync.
- Browser-only local storage cannot be the source of truth.
- Home Tasks comes before Recipes.

## Expected H2 architecture questions

Before implementing H2, decide:
- frontend stack
- backend or managed backend approach
- persistence layer
- auth/session approach
- deployment target
- backup/export path

## Planned boundaries once implementation exists

Document only real structure once chosen:
- app shell and routing
- Home Tasks domain logic
- recurrence and due-state calculation
- persistence layer
- auth/session boundary
- API contracts if routes exist
- UI components and state flow

## Non-goals for now

- No speculative microservices.
- No complex role model.
- No notification architecture before due-state logic is trustworthy.
- No recipe automation before manual recipe CRUD is reliable.
