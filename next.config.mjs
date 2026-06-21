/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages: `next build` writes a fully static `out/`.
  // Works because the site has no backend (the Ask experience is curated client-side).
  output: "export",
  // GitHub Pages serves directories, so emit `writing/slug/index.html` instead of
  // `writing/slug.html`. Makes clean URLs resolve without a server.
  trailingSlash: true,
  // No image-optimization server on Pages; required if next/image is ever used.
  images: { unoptimized: true },
};

export default nextConfig;
