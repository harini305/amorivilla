// Builds the optimised images in public/images from the Phase 1 originals.
// Only photos the current design uses are listed, so nothing unused ships.
// Originals are never modified. Images are resized down only (never upscaled),
// converted to WebP and stripped of metadata.
// Run: node scripts/prepare-images.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "docs/source-audit/original-assets/wp-content/uploads";
const OUT = "public/images";
const WIDTHS = [640, 1024, 1366];

// slug -> original file (relative to SRC)
const PHOTOS = {
  "valley-dawn": "2018/12/DSC_5037.jpg",
  "pool-pavilions": "2018/09/Amori-Villa-for-Carly-059.jpg",

  "poolside-bedroom": "2019/01/DSCF5806.jpg",
  "poolside-bath": "2018/09/P-Bath-2017.jpg",
  "poolside-garden": "2018/09/P-View-To-Valley-1.jpg",
  "valleyview-bedroom": "2018/09/VV-Bedroom-2-1.jpg",
  "valleyview-bed": "2018/09/WRD_7269-1.jpg",
  "valleyview-bath": "2018/12/VV-Bathroom-2.jpg",
  "garden-villa-terrace": "2019/01/RLH0893.jpg",
  "garden-villa-bedroom": "2018/12/GV-Spacious-Bedroom.jpg",
  "garden-villa-bath": "2018/12/GV-Bathroom-1.jpg",
  "honeymoon-bed": "2018/09/H-Honeymoon-bed-setup-2.jpg",
  "honeymoon-view": "2019/01/RLH0760.jpg",
  "honeymoon-bath": "2018/09/H-Bathroom-2.jpg",
  "treehouse-lounge": "2019/01/RLH0583.jpg",
  "treehouse-bedroom": "2019/01/RLH0600.jpg",
  "treehouse-bath": "2019/01/Treehouse-Villa-3-Bathroom.jpg",

  "restaurant-lounge": "2018/09/Living-Dining.jpg",
  "yoga-pavilion": "2019/04/Yoga-inhouse-session.jpg",
  "spa-room": "2018/09/Spa-interior-daylight-021.jpg",
  "floating-breakfast": "2019/01/DSCF5714.jpg",

  "yoga-valley": "2018/09/Amori-VIllas-Yoga-2.jpg",
  "yoga-group": "2019/04/Yoga-group.jpg",
  "aerial": "2025/11/Aerial-2024-small.jpg",

  // Further photos used by the current layout.
  "villa-hillside": "2018/09/Amori-Villa-close-view.jpg",
  "pool-guests": "2019/01/What-shall-we-do-today-2016.jpg",
  "retreat-dinner": "2018/09/closing-dinner.jpg",
  "valleyview-outdoor-bath": "2018/09/Valleyview-Bathroom-2017.jpg",
  "garden-villa-daybed": "2018/12/Amori-Villa-for-Carly-031.jpg",
  "garden-villa-lounge": "2019/01/RLH0899.jpg",
  "honeymoon-champagne": "2019/01/RLH0847.jpg",
  "honeymoon-stone-bath": "2019/01/RLH0857-copy.jpg",
  "treehouse-exterior": "2018/09/Treehouse-Villa.jpg",
  "treehouse-garden-bath": "2018/09/TV-Bathroom.jpg",
};

const manifest = {};

await mkdir(OUT, { recursive: true });

for (const [slug, file] of Object.entries(PHOTOS)) {
  const input = path.join(SRC, file);
  const { width, height } = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w < width);
  if (!widths.includes(width) && width <= Math.max(...WIDTHS)) widths.push(width);
  const unique = [...new Set(widths.filter((w) => w <= width))].sort((a, b) => a - b);

  for (const w of unique) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6, smartSubsample: true })
      .toFile(path.join(OUT, `${slug}-${w}.webp`));
  }
  manifest[slug] = { source: file, width, height, widths: unique };
}

// Logos: white (from logo-03.png) and logo green #21543F recoloured from the same alpha mask.
const logoSrc = path.join(SRC, "2018/09/logo-03.png");
const trimmed = await sharp(logoSrc).trim().png().toBuffer();
const logoBuf = await sharp(trimmed).resize({ width: 440 }).png().toBuffer();
const meta = await sharp(logoBuf).metadata();
await sharp(logoBuf).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, "logo-white.webp"));
const alpha = await sharp(logoBuf).extractChannel("alpha").toBuffer();
await sharp({ create: { width: meta.width, height: meta.height, channels: 3, background: "#21543F" } })
  .joinChannel(alpha)
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(path.join(OUT, "logo-green.webp"));
manifest.logo = { source: "2018/09/logo-03.png", width: meta.width, height: meta.height };

// Favicon: the mountain-stroke mark from the top of the logo, in logo green on white.
// Each step is a separate pipeline because sharp reorders operations within one.
const full = await sharp(trimmed).metadata();
const greenFull = await sharp({ create: { width: full.width, height: full.height, channels: 3, background: "#21543F" } })
  .joinChannel(await sharp(trimmed).extractChannel("alpha").toBuffer())
  .png()
  .toBuffer();
const markTop = await sharp(greenFull)
  .extract({ left: 0, top: 0, width: full.width, height: Math.round(full.height * 0.52) })
  .png()
  .toBuffer();
const mark = await sharp(markTop).trim().png().toBuffer();
// White mark on logo green, stroke thickened so it survives at 16–32px.
const markAlpha = await sharp(mark).extractChannel("alpha").resize({ width: 440 }).blur(2.2).threshold(28).raw().toBuffer({ resolveWithObject: true });
const whiteMark = await sharp({ create: { width: markAlpha.info.width, height: markAlpha.info.height, channels: 3, background: "#FFFFFF" } })
  .joinChannel(markAlpha.data, { raw: markAlpha.info })
  .png()
  .toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#21543F" } })
  .composite([{ input: whiteMark, gravity: "center" }])
  .png()
  .toFile("app/icon.png");

await mkdir("lib", { recursive: true });
await writeFile("lib/image-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`Prepared ${Object.keys(PHOTOS).length} photos and logos.`);
