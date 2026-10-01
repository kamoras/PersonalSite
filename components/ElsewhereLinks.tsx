import { siteConfig } from "@/lib/site";
import { socialLinks } from "@/lib/socials";

type Item = { key: string; href: string; text: string; newTab: boolean; type?: string };

function items(includeEmail: boolean): Item[] {
  return [
    { key: "resume", href: siteConfig.resumeDocumentPath, text: "Résumé", newTab: true },
    { key: "rss", href: siteConfig.feedPath, text: "RSS", newTab: false, type: "application/rss+xml" },
    ...socialLinks.map(({ key, href, name }) => ({ key, href, text: name, newTab: true })),
    ...(includeEmail ? [{ key: "email", href: `mailto:${siteConfig.email}`, text: "Email", newTab: false }] : []),
  ];
}

function ItemLink({ href, text, newTab, type }: Item) {
  return newTab ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text} <span aria-hidden="true">↗︎</span>
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  ) : (
    <a href={href} type={type}>{text}</a>
  );
}

export default function ElsewhereLinks({ variant }: { variant: "rail" | "sheet" }) {
  if (variant === "sheet") {
    return (
      <div className="sheet-foot">
        {items(true).map((item) => (
          <ItemLink {...item} key={item.key} />
        ))}
      </div>
    );
  }
  return (
    <ul className="rail-links" aria-label="Elsewhere">
      {items(false).map((item) => (
        <li key={item.key}>
          <ItemLink {...item} />
        </li>
      ))}
    </ul>
  );
}
