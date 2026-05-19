import { createBrowserClient } from "@supabase/ssr";

/*
  Browser-safe Supabase client.
  Uses only NEXT_PUBLIC_ env vars — safe to expose to the browser.
  Do NOT import the service role key here.
*/
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
