// Stacks above the sticky top bar so it is visible
// when focused.
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-[calc(1rem+env(safe-area-inset-top,0px))] focus-visible:left-4 focus-visible:z-[60] focus-visible:px-4 focus-visible:py-2.5 focus-visible:bg-[var(--fg)] focus-visible:text-[var(--bg)] focus-visible:font-[family-name:var(--mono)] focus-visible:text-[0.8125rem]"
    >
      Skip to content
    </a>
  );
}
