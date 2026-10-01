import Link from "next/link";
import SectionHead from "./SectionHead";
import { formatShortDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function LatestWriting({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="wrap sec" id="writing" data-track aria-labelledby="writing-heading">
      <SectionHead id="writing" title="Writing" />
      <ol className="ledger">
        {posts.map((post) => (
          <li key={post.slug} className="row essay-row no-margin reveal">
            <p className="when meta">
              <time dateTime={post.date}>{formatShortDate(post.date)}, {post.date.slice(0, 4)}</time>
              <br />
              {post.readingTime} min read
            </p>
            <div className="body">
              <h3>
                <Link className="title-link" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p>{post.description}</p>
              <ul className="tags topic-tags" aria-label="Topics">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`/blog?topic=${encodeURIComponent(tag)}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className="section-foot">
        <Link className="btn" href="/blog">
          All essays
        </Link>
        <a className="textlink" href={siteConfig.feedPath} type="application/rss+xml">
          Subscribe via RSS
        </a>
      </p>
    </section>
  );
}
