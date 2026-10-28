// Page content. Every fact here comes from the Phase 1 audit
// (docs/source-audit/03-content-inventory.md). Copy has been condensed and
// spelling normalised, but no facts, prices or claims have been added.
// Unverified items (booking-engine links, phone numbers, Facebook, package
// prices) are intentionally left out; see docs/phase-2-report.md.

// Verified in the audit: wa.me link returns 200 (06 §1). The prefilled text is
// the original "Amori Villa Web Enquiries"; an optional topic is appended.
const WHATSAPP_BASE = "https://wa.me/6281239893333";
export function whatsappLink(topic) {
  const text = topic ? `Amori Villa Web Enquiries - ${topic}` : "Amori Villa Web Enquiries";
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export const site = {
  name: "Amori Villas",
  strapline: "Luxury Ubud Retreat",
  address: ["Br Dukuh, Pejeng Kawan", "Gianyar 80552, Bali"],
  instagram: { href: "https://www.instagram.com/amorivillas/", handle: "amorivillas" },
  // Built from the verified Google Maps embed query (06 §1).
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Amori Villas: Luxury Ubud Retreat"),
};

export const navItems = [
  { id: "villa", label: "The Villa" },
  { id: "suites", label: "Suites" },
  { id: "experiences", label: "Experiences" },
  { id: "wellness", label: "Wellness" },
  { id: "retreats", label: "Retreats" },
  { id: "location", label: "Location" },
];

// Old homepage anchors (03 §2) mapped to the new sections.
export const legacyAnchors = {
  about: "villa",
  "that-amori": "villa",
  "the-amori-experience": "experiences",
  accomodation: "suites",
  accommodation: "suites",
  rates: "contact",
  yoga: "wellness",
  spa: "experiences",
  galery: "experiences",
  gallery: "experiences",
};

export const suites = [
  {
    id: "poolside",
    features: ["Gardens and valley", "Near the pool and jacuzzi", "Terrazzo bath"],
    name: "Poolside",
    type: "Deluxe Suite #1",
    description:
      "Opening onto the gardens and valley, close to the pool and jacuzzi, this suite is made for a swim before breakfast. The marble-floored bathroom has a cream terrazzo bath with its own views.",
    bedding: "King-size double, twin or triple",
    essentials: "Air-conditioning, ceiling fan, TV, desk, hairdryer, makeup mirror",
    images: [
      { name: "poolside-bedroom", alt: "Poolside Suite bedroom with a carved day bench at the foot of the bed" },
      { name: "poolside-bath", alt: "Freestanding cream terrazzo bath beside garden doors in the Poolside Suite" },
      { name: "poolside-garden", alt: "Poolside Suite bedroom opening through French doors to the garden" },
    ],
  },
  {
    id: "valleyview",
    features: ["Stargazing balcony", "Valley views", "Sunken terrazzo bath"],
    name: "Valleyview",
    type: "Grand Double Suite #2",
    description:
      "Views from the stargazing balcony, the desk in the bay window and the king-size bed bring instant calm. The huge indoor/outdoor bathroom has a viewing window to the valley, a choice of two showers, a sunken terrazzo bath and a fish pond. A romantic dinner for two on the balcony is highly recommended.",
    bedding: "King-size double",
    essentials:
      "Air-conditioning, ceiling fan, mosquito netting, smart TV, desk, hairdryer, makeup mirror",
    images: [
      { name: "valleyview-bedroom", alt: "Valleyview Suite with a netted king-size bed under a vaulted ceiling" },
      { name: "valleyview-bed", alt: "Valleyview Suite bed facing windows over the jungle valley" },
      { name: "valleyview-bath", alt: "Sunken terrazzo bath in the Valleyview Suite's indoor/outdoor bathroom" },
      { name: "valleyview-outdoor-bath", alt: "Open-air section of the Valleyview bathroom with a sunken bath among ferns" },
    ],
  },
  {
    id: "garden-villa",
    features: ["Private garden", "Walled courtyard", "90 sq m in all"],
    name: "Garden Villa",
    type: "Deluxe Suite #3",
    description:
      "Extremely private, with everything you might want except views and a bath: 50 sq m of bedroom and bathroom, plus another 40 sq m of garden and walled courtyard. Double sliding doors on two sides open the bright bedroom to the garden, and the large marble bathroom has a garden window.",
    bedding: "King-size double, twin or triple",
    essentials: "Air-conditioning, ceiling fan, TV, desk, hairdryer, makeup mirror",
    images: [
      { name: "garden-villa-terrace", alt: "Garden Villa sitting area with glass doors open to tropical planting" },
      { name: "garden-villa-bedroom", alt: "Spacious Garden Villa bedroom with doors to the garden" },
      { name: "garden-villa-bath", alt: "Marble shower in the Garden Villa with a stone relief and garden window" },
      { name: "garden-villa-daybed", alt: "Garden Villa verandah with a carved day bed and turquoise cushions" },
      { name: "garden-villa-lounge", alt: "Garden Villa lounge seating beside the glass wall of the bedroom" },
    ],
  },
  {
    id: "honeymoon",
    features: ["Highest point", "Four-poster bed", "Panoramic views"],
    name: "Honeymoon",
    type: "Grand Double Suite #4",
    description:
      "At Amori's highest point, with panoramic views from the bedroom and the bathroom. Picture a Balinese massage followed by a flower-petal bath in the terrazzo tub, then a quiet evening in the four-poster bed. Butler service is a phone call away.",
    bedding: "King-size double",
    essentials: "Air-conditioning, ceiling fan, mosquito netting, smart TV, hairdryer, makeup mirror",
    images: [
      { name: "honeymoon-bed", alt: "Four-poster bed in the Honeymoon Suite dressed with petals and towel swans" },
      { name: "honeymoon-view", alt: "Honeymoon Suite bed and balcony overlooking the treetops" },
      { name: "honeymoon-bath", alt: "Honeymoon Suite bathroom with a terrazzo bath set among plants" },
      { name: "honeymoon-stone-bath", alt: "Stone bath in a walled garden courtyard filled with tropical plants" },
      { name: "honeymoon-champagne", alt: "Champagne on a breakfast tray in bed, with doors open to the balcony" },
    ],
  },
  {
    id: "treehouse",
    features: ["One bedroom", "Sleeps up to five", "Lounge and verandah"],
    name: "Treehouse",
    type: "Villa #5, one bedroom",
    description:
      "Set privately among lush tropical trees, the one-bedroom villa sleeps a family of four or five, or offers spacious luxury for two. Beyond the bedroom and the enormous indoor/outdoor bathroom there is a separate lounge and a verandah with a day bed, with housekeeping and butler service.",
    bedding: "King-size double or twin, plus a double sofa bed and/or an extra single bed",
    essentials: "Air-conditioning, ceiling fan, smart TV, desk, hairdryer, makeup mirror",
    images: [
      { name: "treehouse-lounge", alt: "Treehouse Villa lounge with windows and a verandah facing the trees" },
      { name: "treehouse-bedroom", alt: "Treehouse Villa bedroom with timber ceiling and garden window" },
      { name: "treehouse-bath", alt: "Treehouse Villa's open-air bathroom with twin showers and a stone bath" },
      { name: "treehouse-exterior", alt: "Entrance to the thatched Treehouse Villa among the trees" },
      { name: "treehouse-garden-bath", alt: "Freestanding bath and outdoor shower in the Treehouse Villa's garden bathroom" },
    ],
  },
];

export const activities = [
  "A free guided walk around the banjar, including a visit to a family compound",
  "Whitewater rafting, cycling and trekking",
  "A sunrise climb of Mt Batur",
  "Herb walks and a visit to a Balian healer",
  "Balinese dance and gamelan shows, galleries and craft lessons",
];

export const inclusions = [
  "Welcome drink, cooked snack and refreshing towel on arrival",
  "À-la-carte breakfast: Continental, American, Asian or Health-lovers, at the table or in your room",
  "Car shuttle to and from Ubud centre, 10 minutes away",
  "Unlimited spring water and free wi-fi throughout the property",
  "Complimentary airport pickup for 3-night stays, and two-way transfers for 4 nights or more, for direct website bookings",
];

export const bookingTerms = [
  "Room rates are in US dollars for two people and exclude tax and service charges, totalling 21%.",
  "Each extra person is US$50 per night. Children 16 and under are US$40 per night, and infants 2 and under US$15 per night.",
  "A deposit of 50% of the total accommodation charge is processed after booking.",
  "Cancellation is free up to 14 days before arrival.",
];

// Sixth card in the suites grid: the verified "Exclusive Use of 5 Villas" rate.
export const wholeProperty = {
  name: "Exclusive use",
  features: ["All five suites and villas", "All staff", "Group retreats"],
  image: { name: "villa-hillside", alt: "Amori's thatched villas stepping down a jungle hillside" },
};

export const commonEssentials = ["Air-conditioning", "Ceiling fan", "TV", "Hairdryer", "Makeup mirror"];

export const experienceCards = [
  { image: "yoga-pavilion", alt: "Guests meditating in the open bamboo yoga pavilion above the valley", title: "Bamboo yoga pavilion", text: "Yoga and meditation in the serenity of the yoga shala." },
  { image: "pool-guests", alt: "Two guests at the edge of the infinity pool looking over the jungle", title: "Infinity pool and jacuzzi", text: "Lounge by the pool with the sound of the river below." },
  { image: "spa-room", alt: "Spa treatment room with a massage bed and doors to the garden", title: "The spa", text: "Massages, facials, wraps, manicures and pedicures." },
  { image: "restaurant-lounge", alt: "Open-air lounge and dining pavilion under a thatched roof", title: "Restaurant and kitchen", text: "Watch the chefs at work, or join a cooking class." },
  { image: "floating-breakfast", alt: "Breakfast tray with juices floating on the infinity pool", title: "Floating breakfast", text: "Breakfast by, or in, the pool on request." },
];

// Per-package differences (03 §7b). Shared inclusions are listed once below.
export const packageColumns = [
  { id: "3", nights: "3 nights", days: "4 days", yoga: "2 morning sessions", spa: ["Thai massage yoga"], extra: [] },
  { id: "5", nights: "5 nights", days: "6 days", yoga: "4 morning sessions", spa: ["3 Balinese massages", "Herbal boreh wrap"], extra: ["High Priest cleansing visit"] },
  { id: "7", nights: "7 nights", days: "8 days", yoga: "6 morning sessions", spa: ["4 Balinese massages", "Herbal boreh wrap", "Thai massage yoga"], extra: ["High Priest cleansing visit", "Half-day Tegalalang tour"] },
];

export const packageCommon = [
  "Transfers",
  "Welcome drink and healthy snack",
  "“Angels Praying” blessing ceremony",
  "Daily healthy breakfast",
  "Fresh coconut drink",
  "Natural facial",
  "Two afternoon meditation sessions",
  "Afternoon herbal tea",
  "Daily shuttle to Ubud",
];
