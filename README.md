# Amori Villas

Single-page website for Amori Villas, a small luxury hotel near Ubud, Bali.

Built with Next.js (App Router), React and GSAP. Static content only: no backend,
no forms, no booking engine. Enquiries go to the property's WhatsApp.

## Run locally

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Project layout

- `app/` — page, layout, styles (`globals.css`), 404 page and favicon
- `components/` — header, suite cards and room dialog, icons, motion, footer fit
- `lib/content.js` — all site text, taken from the verified Phase 1 audit
- `public/images/` — pre-sized WebP photos (only those the page uses)
- `scripts/prepare-images.mjs` — regenerates `public/images` from the original
  photos (the originals live in the local `docs/source-audit` folder, which is
  not in this repository)

## Notes

- Image optimisation is disabled (`images.unoptimized`); images are resized
  ahead of time and served with long cache headers.
- Package prices, phone numbers and booking-engine links are intentionally not
  shown until the owner confirms them.
