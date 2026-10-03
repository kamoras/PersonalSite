import { FileText, Rss } from "lucide-react";
import { mailtoUrl, siteConfig } from "@/lib/site";
import { socialLinks } from "@/lib/socials";

function Socials() {
  return (
    <ul className="socials" aria-label="Elsewhere">
      {socialLinks.map(({ key, href, name, handle, icon: Icon }) => (
        <li key={key}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Icon aria-hidden="true" />
            {name}
            <span className="handle">
              {handle} <span aria-hidden="true">↗︎</span>
            </span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </li>
      ))}
      <li>
        <a href={siteConfig.resumeDocumentPath} target="_blank" rel="noopener noreferrer">
          <FileText aria-hidden="true" />
          Résumé
          <span className="handle">
            PDF <span aria-hidden="true">↗︎</span>
          </span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </li>
      <li>
        <a href={siteConfig.feedPath} type="application/rss+xml">
          <Rss aria-hidden="true" />
          RSS
          <span className="handle">feed.xml</span>
        </a>
      </li>
    </ul>
  );
}

function Fine() {
  return (
    <div className="fine meta">
      <span>© {new Date().getFullYear()} {siteConfig.name}</span>
      <span>{siteConfig.domain}</span>
      <p className="privacy">
        Privacy: this site sets no cookies. Umami counts visits without identifying you, essay comments are
        hosted by GitHub through giscus, and booking a session opens Calendly, each under its own privacy policy.
      </p>
    </div>
  );
}

export function ContactFooter() {
  return (
    <footer className="wrap colophon" id="contact" data-track aria-labelledby="contact-heading">
      <div className="colophon-inner">
        <div className="reveal">
          <h2 id="contact-heading" className="contact-h">
            Let&rsquo;s connect
          </h2>
          <p className="intro">Open to conversations, collaborations, and the right opportunities.</p>
          <a className="email" href={mailtoUrl()}>{siteConfig.email}</a>
        </div>
        <Socials />
      </div>
      <Fine />
    </footer>
  );
}

export function SiteFooter() {
  return (
    <footer className="wrap colophon" aria-label="Site footer">
      <div className="colophon-inner">
        <div>
          <p className="label margin-h">Contact</p>
          <a className="email small" href={mailtoUrl()}>{siteConfig.email}</a>
          <p className="intro quiet">
            Open to conversations, collaborations, and the right opportunities.
          </p>
        </div>
        <Socials />
      </div>
      <Fine />
    </footer>
  );
}
