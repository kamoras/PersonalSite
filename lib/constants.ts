// The prefix rehype-sanitize applies to id/name attributes for DOM clobbering
// protection. remark-rehype is configured with clobberPrefix:"" so this prefix
// is applied exactly once (by the sanitizer); lib/posts.ts then rewrites
// in-page hrefs to carry it too.
export const FOOTNOTE_ID_PREFIX = "user-content-";
