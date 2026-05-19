# Lessons

## Durable guardrails

- Do not copy prototype HTML directly into production. Convert prototype intent into components, tokens, and stateful flows.
- Do not use browser-only local storage as source of truth because the app must sync across both phones.
- Do not build Recipes before Home Tasks source-of-truth and persistence patterns are reliable.
- Do not store recurring task status as truth. Derive it from recurrence and completion history.
- Do not add automation before the manual workflow works.
- `tasks/project_stage.md` is the source of truth for current stage. `docs/project_context.md` must mirror it and cannot independently change stage wording.
