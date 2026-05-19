# Auth Model Contract

Status: Conditionally active. Becomes active when shared household login is implemented.

## v1 auth stance

Home App v1 uses one shared household login for Jon and CY.

## Requirements

- Shared login protects all household task and recipe data.
- Logged-out users cannot access app data.
- Failed login shows clear inline feedback.
- Session should work on mobile browser and installed PWA where applicable.
- Secrets must not be committed.
- Auth configuration must be documented before deployment.

## Non-goals for v1

- No separate Jon/CY accounts.
- No role-based permissions.
- No admin console.
- No social login unless chosen deliberately later.
- No biometric/passkey requirement in v1.

## Security rules

- Never store plaintext passwords.
- Never commit secrets.
- Do not rely on frontend hiding for protection.
- Server/API must enforce access where backend exists.
- Session expiry must fail safely.
