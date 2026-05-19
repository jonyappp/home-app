# Auth Model Contract

Status: Active. H2A has chosen the auth direction. Implementation is H3.

## v1 auth stance

Home App v1 uses one shared household login for Jon and CY via Supabase Auth.

## Chosen approach

- **Auth provider:** Supabase Auth.
- **Account model:** one shared household Supabase Auth user account. Both Jon and CY use the same credentials.
- **Session handling:** `@supabase/ssr` manages session cookies in Next.js. Middleware will refresh sessions (H3).
- **Data access:** Supabase RLS policies use `auth.uid()` matched against `household_members.user_id`.

## H2A status

- Supabase Auth packages are installed (`@supabase/supabase-js`, `@supabase/ssr`).
- Server and browser Supabase clients are scaffolded (`src/lib/supabase/`).
- RLS is enabled and membership-based policies are in the migration.
- **Login UI, session middleware, and protected routes are H3.**
- H2 data should not be exposed to unauthenticated users in production before H3 is complete.

## H3 will implement

- Supabase Auth email/password login (or other method TBD).
- Next.js middleware for session refresh and route protection.
- Logged-out redirect to login page.
- Failed login inline error feedback.
- Session persistence suitable for mobile web/PWA.
- RLS policy end-to-end testing.

## Requirements (to be verified in H3)

- Shared login protects all household task and recipe data.
- Logged-out users cannot access app data.
- Failed login shows clear inline feedback.
- Session works on mobile browser and installed PWA where applicable.
- Secrets must not be committed.

## Non-goals for v1

- No separate Jon/CY accounts.
- No role-based permissions.
- No admin console.
- No social login unless chosen deliberately later.
- No biometric/passkey requirement in v1.

## Security rules

- Never store plaintext passwords.
- Never commit secrets.
- Do not rely on frontend hiding for protection — RLS enforces server-side.
- Service role key must never be exposed to the browser.
- Session expiry must fail safely.
