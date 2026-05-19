import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/*
  Server-only Supabase client (Server Components and Server Actions).
  Reads session from cookies via Next.js headers().
  Never import this in Client Components — it will throw at runtime.

  H3 note: full session handling and auth enforcement will be added in H3.
  In H2, RLS policies are scaffolded but not enforced until auth is live.
*/
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from Server Components where cookies are read-only.
            // Safe to ignore — middleware will handle session refresh.
          }
        },
      },
    }
  );
}
