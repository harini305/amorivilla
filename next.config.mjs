/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid Vercel Image Optimization usage; images are pre-sized in public/images.
  images: { unoptimized: true },

  // Fewer CDN requests: browsers keep the pre-sized images instead of
  // re-checking them on every visit. (/_next/static assets are
  // already cached as immutable by Next.js.) Rename a file if it ever changes.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // The favicon URL carries a content hash, so it can be cached for good too.
        source: "/icon.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // No "X-Powered-By" header on every response.
  poweredByHeader: false,

  // Old WordPress routes point at the matching section of the new single page.
  // The hijacked /accomodation/ and /amori-spa/ paths now resolve here, not to third-party sites.
  async redirects() {
    return [
      { source: "/accomodation/:path*", destination: "/#suites", permanent: true },
      { source: "/accommodation/:path*", destination: "/#suites", permanent: true },
      { source: "/amori-spa", destination: "/#experiences", permanent: true },
      { source: "/thats-amori", destination: "/#villa", permanent: true },
      { source: "/ubud-bali", destination: "/#villa", permanent: true },
      { source: "/the-amori-experience", destination: "/#experiences", permanent: true },
      { source: "/the-amori-experience-1", destination: "/#experiences", permanent: true },
      { source: "/photo-gallery", destination: "/#experiences", permanent: true },
      { source: "/yoga-and-wellness-retreats", destination: "/#wellness", permanent: true },
      { source: "/yoga-and-wellness-retreats-packages", destination: "/#wellness", permanent: true },
      { source: "/location-map", destination: "/#location", permanent: true },
      { source: "/contact-us", destination: "/#contact", permanent: true },
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
