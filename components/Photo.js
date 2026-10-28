import manifest from "@/lib/image-manifest.json";

// Responsive <img> built from the pre-generated WebP sizes in public/images.
// next/image is not used because image optimisation is disabled
// (images.unoptimized), which would drop srcset generation.
export default function Photo({ name, alt, sizes = "100vw", priority = false, className, style }) {
  const entry = manifest[name];
  if (!entry) throw new Error(`Unknown image: ${name}`);
  const { width, height, widths } = entry;
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = widths.includes(1024) ? 1024 : widths[widths.length - 1];

  return (
    <img
      src={`/images/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={style}
    />
  );
}
