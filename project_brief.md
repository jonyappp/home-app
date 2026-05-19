# Project Brief - Home App

## 1. Product goal

Home App is a private household app for Jon and CY to manage recurring home tasks and personal recipes from a fast, mobile-first shared interface.

The product should reduce household friction by answering quickly:

1. What home tasks need attention?
2. What is coming up soon?
3. What recipes can we cook, repeat, or improve?
4. How do we keep shared household information synced across both phones?

## 2. Users and operating model

Primary users:
- Jon
- CY

v1 operating model:
- One shared household login.
- Both users see the same household task and recipe data.
- Mobile web/PWA is the primary surface.
- Desktop support is secondary but should not break.
- Data must sync across both phones through shared persistence.

## 3. Core problem

Household tasks and cooking ideas are easy to lose across memory, chats, notes, and reminders.

This creates:
- missed recurring maintenance
- unclear due dates
- repeated decision fatigue around meals
- recipe tweaks not being captured
- no simple shared household source of truth

The product goal is household clarity and repeatability, not a feature-heavy productivity system.

## 4. v1 scope

v1 lets Jon and CY share one mobile-first household app to track recurring home tasks and maintain a simple recipe library.

## 5. First thin slice

Home Tasks first.

The first implementation slice should allow the household to:
- view tasks grouped by due state
- add a recurring task
- mark a task as done
- derive the next due date from recurrence and completion history
- sync the result across both phones

## 6. Near-term second slice

Recipes soon after Home Tasks.

Recipes should support:
- browse saved recipes
- add/edit basic recipe details
- tried/want-to-try status
- tags
- notes and tweaks
- ingredients with base pax
- simple pax scaling
- cook mode

## 7. Must-have capabilities

### Home Tasks
- recurring tasks
- one-off tasks
- due date
- recurrence rule
- completion history
- derived status: overdue, due soon, scheduled, no due date
- mark done
- safe edit/delete
- shared sync across both phones

### Recipes
- recipe library
- recipe detail
- tags and filters
- tried/want-to-try status
- notes
- pax scaling from base servings
- cook mode
- optional images or recipe-card photo

### Shared foundation
- one shared household login
- shared persistence
- mobile-first UI
- backup/export path before the app becomes important
- clear loading, empty, error, stale, partial, and populated states where relevant

## 8. Must-not-haves for v1

- No social sharing.
- No public recipe publishing.
- No complex meal-planning engine.
- No grocery optimisation in v1.
- No AI recipe parsing until manual recipe entry is reliable.
- No native mobile app.
- No multi-user permission model in v1.
- No notification system until due-state logic is trustworthy.
- No decorative dashboard metrics that do not help household action.

## 9. Product principles

1. Clarity over completeness.
2. Shared source of truth over scattered notes.
3. Manual-first reliability before automation.
4. Mobile-first interaction quality.
5. Simple data model with derived states.
6. Small, verifiable slices.
7. Sync and backup matter because this is household memory.

## 10. Success criteria

The product is successful when:
- Jon or CY can see what needs attention in under 10 seconds.
- A recurring task can be added and completed from mobile in under 30 seconds.
- Completing a task correctly updates the next due date.
- Data updates made on one phone are visible on the other.
- Recipe lookup is faster than searching through chats or notes.
- Important household data survives refreshes, restarts, and deployment updates.

## 11. Constraints

- Use one shared household login for v1.
- Data must sync across both phones.
- Avoid unnecessary infrastructure.
- Avoid a heavy frontend architecture unless the implementation earns it.
- Keep the system easy for an AI coding agent to inspect, modify, and verify.
