# Decision Log

## 2026-03-20 - Adopt staged file activation

Decision:
- Adopt staged file activation controlled by `tasks/project_stage.md`.
- Standardise planning around milestones rather than priority buckets.
- Split reusable design guidance from project-specific UI implementation.

Reasoning:
- The template should stay lean until complexity is real.
- Milestones are clearer and less contradictory than mixed priority buckets.
- Reusable design rules should not be embedded in project-specific files.

Alternatives considered:
- Keeping all files active from day one.
- Continuing with priority-bucket planning.
- Storing reusable and project-specific design guidance in one file.

Status:
Accepted

---

## 2026-05-20 - v1 uses one shared household login

Decision:
Home App v1 will use one shared household login for Jon and CY.

Reasoning:
Separate accounts and permissions add complexity before the workflows are proven. A shared login is enough for v1 because both users can see the same household tasks and recipes.

Trade-off:
This delays per-user attribution and permissions.

Status:
Accepted

---

## 2026-05-20 - Cross-phone sync is required from v1

Decision:
Home App v1 must sync across both phones.

Reasoning:
The app is meant to be a shared household source of truth. Browser-only local data would fail the core use case.

Trade-off:
The first implementation needs shared persistence earlier than a purely local prototype.

Status:
Accepted

---

## 2026-05-20 - Home Tasks before Recipes

Decision:
Build Home Tasks before Recipes.

Reasoning:
Recurring task correctness establishes the app's source-of-truth, persistence, and sync patterns. Recipes should follow soon after, but should not be built before the shared data foundation is reliable.

Trade-off:
Recipes are delayed slightly, but implementation risk is lower.

Status:
Accepted
