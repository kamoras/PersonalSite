import Link from "next/link";
import { sectionHref, siteSections } from "@/lib/nav";

type Props = {
  onHome: boolean;
  /** Section id rendered as the current page (aria-current="page"). */
  currentPage?: string;
  /** Extra rows rendered right after the current page's row. */
  children?: React.ReactNode;
  className?: string;
};

// The site contents shared by the rail and the mobile sheet. On the
// homepage, SectionTracker marks the visible section with aria-current.
export default function SiteToc({ onHome, currentPage, children, className = "toc" }: Props) {
  return (
    <ol className={className}>
      {siteSections.map(({ id, label }) => (
        <SiteTocItem key={id} href={sectionHref(id, onHome)} label={label} section={onHome ? id : undefined} current={currentPage === id}>
          {currentPage === id ? children : null}
        </SiteTocItem>
      ))}
    </ol>
  );
}

function SiteTocItem({
  href,
  label,
  section,
  current,
  children,
}: {
  href: string;
  label: string;
  section?: string;
  current: boolean;
  children?: React.ReactNode;
}) {
  const inner = <span className="t">{label}</span>;
  return (
    <>
      <li>
        {href.startsWith("#") ? (
          <a href={href} data-section={section}>{inner}</a>
        ) : (
          <Link href={href} aria-current={current ? "page" : undefined}>{inner}</Link>
        )}
      </li>
      {children}
    </>
  );
}
