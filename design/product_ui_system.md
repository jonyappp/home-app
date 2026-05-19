# Product UI System

## Design philosophy

Home App should feel calm, fast, domestic, and high-trust.

The UI should be:
- mobile-first
- low-friction
- warm and restrained
- clear over clever
- action-oriented
- easy for both Jon and CY to use without explanation

Avoid turning the app into a dashboard for its own sake.

## Design benchmarks

Reference feel:
- Apple Reminders
- Apple Home
- Things
- Airbnb-level clarity for cards and detail screens

Do not copy visual styling blindly. Use these as quality bars for hierarchy, spacing, interaction, and restraint.

## Mobile-first rules

- Design first for 375px width.
- Minimum practical touch target: 44px.
- Primary actions should be reachable in the lower half of the screen where practical.
- Important actions must remain visible above the keyboard or recover gracefully.
- No primary workflow may require horizontal scrolling.
- Horizontal chip strips are allowed only with a visible affordance such as edge fade.
- Bottom sheets must be closeable through a visible control and backdrop tap where safe.
- Desktop must remain usable but is secondary.

## Visual foundations

Use warm neutrals and restrained accents.

Recommended tokens:
- Page background: `#F0EDE8`
- Card surface: `#FAF8F5`
- Elevated surface: `#EAE7E1`
- Primary text: `#1C1917`
- Secondary text: `#78716C`
- Tertiary text: `#A8A29E`
- Primary action: `#1C1917`
- Link or active state: `#2563EB`
- Positive/on-track: `#16A34A`
- Warning/soon: `#D97706`
- Danger/overdue: `#DC2626`

Colour must carry semantic meaning:
- Green: on track, completed, safe
- Orange: soon, attention
- Red: overdue, destructive, failed
- Blue: link, selected, secondary action
- Near-black: primary action

Always pair colour with text. Do not rely on colour alone.

## Typography

- Use a clear system font stack or Inter if already available.
- Use sentence case for labels.
- Section labels may be uppercase only when used consistently.
- Use tabular numbers for dates, counts, and quantities where helpful.
- Do not use inline typography in production HTML or JS-generated markup.
- Create semantic classes for repeated type roles.

Suggested roles:
- screen title
- section label
- card title
- body
- meta
- badge
- button
- form label

## Spacing and surfaces

- Use a 4px spacing base.
- Mobile horizontal padding: 16px.
- Cards: 14px to 16px radius.
- Inputs: 10px to 12px radius.
- Use borders and background contrast before shadows.
- Avoid decorative gradients, heavy shadows, or visual noise.

## Icons and imagery

- Do not use external icon CDNs in production.
- Do not use emoji as production UI icons.
- Use inline SVG icons with:
  - `stroke="currentColor"`
  - `fill="none"`
  - rounded line caps and joins
  - accessible labels only when meaningful
- Photos and recipe-card images are content, not icons.
- Missing images must have a calm placeholder state.

## Interaction principles

Every interactive element must have:
- affordance: it looks tappable or editable
- feedback: action confirms visibly
- mapping: control effect is obvious

Examples:
- Mark done changes task state immediately or shows loading.
- Add task button opens the add flow, not a generic menu.
- Filter chips show selected state.
- Delete requires confirmation.

## Required states

Every meaningful data component must support:

1. Loading
2. Empty
3. Error
4. Stale where sync freshness matters
5. Partial where some data is missing or still loading
6. Populated

Empty state is not failure. It should explain what to do next.

## Forms

Forms should:
- use clear labels
- avoid placeholder-only meaning
- show validation inline
- show loading state on submit
- prevent double-submit
- preserve user input on error
- be keyboard-safe on mobile
- use date/number controls carefully

## Home Tasks UI rules

Home Tasks primary question:
"What needs attention at home?"

The Home screen should prioritise:
1. Overdue
2. Due soon
3. Scheduled
4. One-off or no-date tasks

Task cards should show:
- task name
- due state
- next due date or no due date
- recurrence summary where relevant
- clear primary action where appropriate

Do not show implementation fields like recurrence IDs in the UI.

## Recipes UI rules

Recipes primary question:
"What can we cook or repeat?"

Recipe browse should prioritise:
- recipe name
- status: tried or want to try
- useful tags
- prep time if known
- image or graceful no-image state

Recipe detail should support:
- base pax
- scaled pax
- ingredients
- notes
- tags
- status
- rating only if it remains useful and low-friction

Cook mode should:
- reduce clutter
- keep exit visible
- keep core cooking reference readable
- not depend on perfect images

## Accessibility basics

- Text must remain readable on mobile.
- Tappable controls should be large enough.
- Interactive icons need accessible names unless paired with visible text.
- Do not communicate state by colour alone.
- Focus states should not be removed.
- Motion should be subtle and not required for comprehension.

## Anti-patterns

Avoid:
- decorative dashboard cards
- too many primary tabs
- hidden tap targets
- hover-only information
- inline style sprawl
- external icon fonts
- emoji icons in production
- storing derived state as truth
- building Recipes before Home Tasks source-of-truth logic is reliable
