# UI Specification - Home App

Status: Active in Core because the app already has a v0 HTML prototype.

This file defines product-specific UI behaviour. Reusable design philosophy belongs in `design/product_ui_system.md`.

## v0 prototype reference

The v0 prototype includes:
- Recipes browse
- Recipe filter bottom sheet
- Decide mode
- Recipe detail
- Cook mode
- Add recipe
- Home task list

The v0 is a design reference only. Do not copy its inline styles, external icon CDN, hard-coded data, or emoji icons directly into production code.

## Information architecture

v1 primary tabs:
- Home
- Recipes

Settings:
- accessed from header, not primary tab

Primary implementation order:
1. Home Tasks
2. Recipes foundation
3. Cook mode and images

## Screen: Home

Primary user question:
"What needs attention at home?"

Primary action:
- Add task

Secondary actions:
- Mark task done
- Edit task
- View task detail
- Filter or group only if the list becomes large

Content groups:
1. Needs attention
2. Coming up
3. Scheduled
4. One-off tasks

Task card fields:
- task name
- due label
- next due date
- recurrence summary
- status badge

Required states:
- Loading: skeleton cards
- Empty: explain no tasks and show Add task
- Error: explain failure and offer retry
- Stale: show if sync status is stale
- Partial: show if tasks loaded but sync/write status is uncertain
- Populated: grouped task list

Mobile rules:
- 375px without horizontal scrolling
- task cards tappable
- mark done touch target at least 44px where practical
- add action visible and obvious

## Screen: Add/Edit Task

Primary action:
- Save task

Fields:
- task name
- task type: recurring or one-off
- due date
- recurrence frequency for recurring tasks
- optional notes
- optional category only if useful

Rules:
- recurring task must have recurrence rule
- one-off task may have no due date
- save shows loading state
- validation errors are inline
- failed save preserves input
- destructive delete requires confirmation

## Screen: Task Detail

Primary actions:
- Mark done
- Edit task

Show:
- task name
- current status
- next due date
- recurrence
- completion history summary
- notes

Rules:
- completed recurring task creates a completion event
- next due date is derived
- do not manually edit derived status

## Screen: Recipes Browse

Primary user question:
"What can we cook?"

Primary action:
- Add recipe

Secondary actions:
- Search recipes
- Filter recipes
- Open recipe detail
- Open Decide mode later

Recipe card fields:
- recipe name
- status: tried or want to try
- tags
- prep time if known
- image or no-image placeholder

Required states:
- Loading
- Empty
- Error
- Populated

## Screen: Add/Edit Recipe

Fields:
- recipe name
- status
- base pax
- tags
- ingredients
- notes
- optional macros
- optional dish photo
- optional recipe-card photo

Rules:
- base pax is the source for scaling
- ingredient quantities scale from base pax
- notes should capture tweaks and memories
- image upload is optional

## Screen: Recipe Detail

Primary actions:
- Cook mode
- Edit recipe

Show:
- title
- status
- pax control
- scaled ingredients
- tags
- notes
- optional rating

Rules:
- scaling must be deterministic
- base quantities remain unchanged when pax changes
- current pax is view state unless explicitly saved

## Screen: Cook Mode

Primary action:
- Exit cook mode

Show:
- recipe title
- recipe-card image if present
- essential cooking reference

Rules:
- exit must always be visible
- missing image must not break layout
- no dense editing controls in cook mode

## Screen: Decide Mode

Status: planned after Recipes foundation.

Purpose:
- help choose a recipe from saved recipes

Rules:
- must use real saved recipe data
- filters should be simple
- randomisation should feel transparent enough to trust

## Navigation rules

- Max 3 primary tabs for v1.
- Settings is not a primary tab.
- Labels describe user jobs, not database modules.
- Home comes before Recipes until Recipes becomes equally important.

## Production code constraints

- No external icon CDN.
- No emoji icons.
- No inline typography sprawl.
- No hard-coded sample data in production paths.
- No browser-only localStorage as source of truth.
