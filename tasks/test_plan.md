# Test Plan

Status: Conditionally active. Becomes active when implementation begins.

## Testing stance

Use the strongest practical checks available for the current stack.

Do not claim behaviour works without:
- automated checks, or
- a documented manual smoke test when automation is unavailable

## H2 Home Tasks verification

Required smoke checks:
- open Home screen
- add recurring task
- add one-off task
- mark recurring task done
- verify next due date updates correctly
- refresh page and verify data persists
- verify 375px mobile layout has no primary horizontal scrolling
- verify desktop remains usable
- verify empty state
- verify error state if backend/API fails can be simulated

Data trust checks:
- recurring status derives from recurrence and completion history
- completion creates an event
- derived status reconciles with current date

## H3 Auth verification

Required smoke checks:
- logged-out user cannot access app data
- shared login succeeds
- failed login shows inline error
- session survives expected mobile usage
- logout or expired session behaves safely

## H4 Recipes verification

Required smoke checks:
- add recipe
- open recipe detail
- edit recipe status
- add ingredients
- change pax and verify scaled quantities
- refresh and verify persistence
- verify 375px mobile layout

## General UI checks

For every UI change:
- check affected flow at 375px width
- check desktop sanity
- check no blank screen
- check no obvious overflow
- check keyboard behaviour for forms
- check loading, empty, error, and populated states where relevant
