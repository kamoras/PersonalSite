// The prefix rehype-sanitize applies to id/name attributes for DOM clobbering
// protection. remark-rehype is configured with clobberPrefix:"" so this prefix
// is applied exactly once (by the sanitizer). BlogContent uses this value when
// resolving footnote elements by id at runtime.
export const FOOTNOTE_ID_PREFIX = "user-content-";
