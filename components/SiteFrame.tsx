import Link from "next/link";
import SkipLink from "./SkipLink";
import TopBar from "./TopBar";
import SiteToc from "./SiteToc";
import ElsewhereLinks from "./ElsewhereLinks";
import ThemeToggle from "./ThemeToggle";
import SectionTracker from "./SectionTracker";
import RevealObserver from "./RevealObserver";

type Props = {
  /** The homepage tracks its sections in the rail; other pages link back to them. */
  onHome?: boolean;
  /** Homepage section id that is this page (e.g. "writing" on /blog). */
  currentPage?: string;
  /** Rows shown under the current page in the site contents. */
  tocExtra?: React.ReactNode;
  /** Replaces the site contents in the rail (the essay page uses its own). */
  rail?: React.ReactNode;
  railLabel?: string;
  /** Rendered above the links at the foot of the rail. */
  railFoot?: React.ReactNode;
  /** Replaces the site contents in the mobile sheet. */
  sheet?: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

// One frame for every page: a sticky contents rail (≥1200px) or top bar,
// then the page content. See README → Design system.
export default function SiteFrame({
  onHome = false,
  currentPage,
  tocExtra,
  rail,
  railLabel = "Site",
  railFoot,
  sheet,
  footer,
  children,
}: Props) {
  const siteToc = (
    <>
      <p className="label rail-label" aria-hidden="true">Contents</p>
      <SiteToc onHome={onHome} currentPage={currentPage}>{tocExtra}</SiteToc>
    </>
  );

  return (
    <>
      <SkipLink />
      <TopBar
        sheet={
          <>
            {sheet ?? <SiteToc onHome={onHome} currentPage={currentPage} className="" />}
            <ElsewhereLinks variant="sheet" />
          </>
        }
      />
      <div className="frame">
        <nav className="rail" aria-label={railLabel} data-print-hidden>
          <Link className="mark" href="/" aria-label="R·M, Ryan Mack, home">
            R<span>·</span>M
          </Link>
          {rail ?? siteToc}
          <div className="rail-foot">
            {railFoot}
            <ElsewhereLinks variant="rail" />
            <ThemeToggle />
          </div>
        </nav>
        <div className="content">
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          {footer}
        </div>
      </div>
      <SectionTracker />
      <RevealObserver />
    </>
  );
}
