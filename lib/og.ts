// Social card images are emitted by route handlers at *.png paths rather than
// the opengraph-image file convention: static export writes that convention's
// output without an extension, and Azure Static Web Apps then serves it as
// application/octet-stream, which link-preview scrapers reject.
export const ogImageSize = { width: 1200, height: 630 };

export function ogImage(url: string, alt: string) {
  return { url, alt, type: "image/png", ...ogImageSize };
}
