// Stacks above the fixed navbar (z-[10000]) so it is visible when focused.
// Uses the same fixed gold-on-dark as the primary CTA buttons in both themes.
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-[calc(1rem+env(safe-area-inset-top,0px))] focus-visible:left-4 focus-visible:z-[10001] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-[#c9a465] focus-visible:text-[#100d09] focus-visible:rounded-lg focus-visible:text-sm focus-visible:font-medium"
    >
      Skip to main content
    </a>
  );
}
