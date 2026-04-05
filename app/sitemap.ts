import { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  const latestPostDate = posts.length > 0 ? new Date(posts[0].date) : new Date("2025-01-01");

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://ryan-mack.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://ryan-mack.dev",
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ryan-mack.dev/blog",
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
  ];
}
