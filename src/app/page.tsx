/*
  Home App — placeholder shell.
  H2A: proves the app starts and applies design tokens.
  Full Home Tasks UI is H2C.
*/
export default function HomePage() {
  return (
    <main
      className="flex flex-col flex-1 px-4 py-8 max-w-lg mx-auto w-full"
      style={{ paddingTop: "env(safe-area-inset-top, 1rem)" }}
    >
      <header className="mb-8">
        <h1 className="type-screen-title">Home</h1>
      </header>

      <section
        aria-label="Active slice"
        className="rounded-[14px] p-4"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <p className="type-section-label mb-2">Current milestone</p>
        <p className="type-card-title">H2 — Home Tasks foundation</p>
        <p className="type-meta mt-1">
          H2A bootstrap complete. Home Tasks UI coming in H2C.
        </p>
      </section>

      <section aria-label="Placeholder task list" className="mt-6">
        <p className="type-section-label mb-3">Tasks</p>
        <div
          className="rounded-[14px] px-4 py-6 text-center"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <p className="type-body" style={{ color: "var(--color-text-secondary)" }}>
            No tasks yet. Task UI is H2C.
          </p>
        </div>
      </section>
    </main>
  );
}
