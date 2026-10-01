import Link from "next/link";
import TopicFilter from "./TopicFilter";
import { formatShortDate } from "@/lib/format";
import type { PostMeta, TopicCount } from "@/lib/posts";

export default function EssayArchive({ posts, topics }: { posts: PostMeta[]; topics: TopicCount[] }) {
  const years = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  const latestSlug = posts[0]?.slug;

  return (
    <>
      <TopicFilter topics={topics} total={posts.length} />
      {[...years].map(([year, yearPosts]) => (
        <section key={year} className="year" id={`y${year}`} data-year aria-labelledby={`y${year}-heading`}>
          <h2 className="year-n" id={`y${year}-heading`}>{year}</h2>
          <ol className="entries">
            {yearPosts.map((post) => {
              const lead = post.slug === latestSlug;
              return (
                <li key={post.slug} className={`entry${lead ? " lead" : ""}`} data-topics={post.tags.join("|")}>
                  <article>
                    <p className="meta entry-meta">
                      {lead && (
                        <>
                          <span className="lead-flag">Latest</span> ·{" "}
                        </>
                      )}
                      <time dateTime={post.date}>{formatShortDate(post.date)}</time> · {post.readingTime} min read
                    </p>
                    <h3>
                      <Link className="title-link" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="dek">{post.description}</p>
                    <ul className="tags topic-tags" aria-label="Topics">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <a href={`/blog?topic=${encodeURIComponent(tag)}`} data-topic={tag}>
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {post.notesCount > 0 && (
                      <p className="sources meta">
                        {post.notesCount} {post.notesCount === 1 ? "source" : "sources"}
                      </p>
                    )}
                  </article>
                  {post.pullquote && <blockquote className="mquote">&ldquo;{post.pullquote}&rdquo;</blockquote>}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </>
  );
}
