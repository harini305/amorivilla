import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

// Two fonts, one style each: Cormorant Garamond Medium for headings,
// Jost Regular for everything else.
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
  variable: "--font-heading",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
  display: "swap",
});

const description =
  "Amori Villas is a small luxury hotel with a wellness focus near Ubud, Bali: five suites and villas, yoga and wellness retreats, and exclusive-use group stays.";

export const metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the live domain once the new site is deployed.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Amori Villas | Luxury Ubud Retreat",
  description,
  openGraph: {
    title: "Amori Villas | Luxury Ubud Retreat",
    description,
    siteName: "Amori Villas",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/valley-dawn-1366.webp", width: 1366, height: 911 }],
  },
};

export const viewport = {
  themeColor: "#21543F",
};

// Address taken from the audit; phone numbers are omitted until confirmed.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Amori Villas",
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Br Dukuh, Pejeng Kawan",
    addressLocality: "Gianyar",
    addressRegion: "Bali",
    postalCode: "80552",
    addressCountry: "ID",
  },
  sameAs: ["https://www.instagram.com/amorivillas/"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
