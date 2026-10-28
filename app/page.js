import SiteHeader from "@/components/SiteHeader";
import SuiteCards from "@/components/SuiteCards";
import Motion from "@/components/Motion";
import FooterFit from "@/components/FooterFit";
import Photo from "@/components/Photo";
import {
  WhatsAppIcon,
  InstagramIcon,
  ArrowIcon,
  CheckIcon,
  BedIcon,
  GuestsIcon,
  StaffIcon,
  PinIcon,
  LeafIcon,
  NavigateIcon,
  Ornament,
} from "@/components/Icons";
import {
  site,
  whatsappLink,
  commonEssentials,
  experienceCards,
  activities,
  packageColumns,
  packageCommon,
  bookingTerms,
  inclusions,
} from "@/lib/content";

const external = { target: "_blank", rel: "noopener noreferrer" };
const newTab = <span className="visually-hidden"> (opens in a new tab)</span>;

const STATS = [
  { Icon: BedIcon, value: "5 suites", label: "Suites and villas" },
  { Icon: GuestsIcon, value: "10–12 guests", label: "At most" },
  { Icon: StaffIcon, value: "14+ staff", label: "Butlers, chefs, therapists" },
  { Icon: PinIcon, value: "10 min", label: "From central Ubud" },
];

const PACKAGE_ROWS = [
  { label: "Yoga sessions", render: (p) => p.yoga },
  { label: "Spa treatments", render: (p) => p.spa.join(" • ") },
  { label: "Also included", render: (p) => (p.extra.length ? p.extra.join(" • ") : "Shared inclusions below") },
  { label: "Price", render: () => <span className="pkg__price">On enquiry</span> },
];

function DotList({ items }) {
  return items.map((item, i) => (
    <span key={item}>
      {i > 0 && <span aria-hidden="true" className="dot-sep"> • </span>}
      {item}
    </span>
  ));
}

const featured = (p) => (p.id === "5" ? " pkg__cell--feature" : "");

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <Motion />
      <FooterFit />

      <main id="main">
        {/* Hero */}
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero__media">
            <Photo
              name="valley-dawn"
              alt="Morning mist over the jungle valley, seen from Amori's gardens with a thatched pavilion and the pool"
              sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
              priority
            />
          </div>
          <div className="hero__content">
            <h1 id="hero-title" className="hero__title">Feel the love</h1>
            <p className="hero__lead">A small luxury hotel with a wellness focus, beside a sacred river near Ubud</p>
            <div className="hero__actions">
              <a className="pill pill--glass" href={whatsappLink()} {...external}>
                <span className="pill__wa"><WhatsAppIcon /></span>
                Enquire on WhatsApp
                {newTab}
              </a>
              <a className="pill pill--cream" href="#suites">
                Explore the suites
              </a>
            </div>
          </div>
        </section>

        {/* That's Amori */}
        <section id="villa" className="screen dark" aria-labelledby="villa-title">
          <div className="container villa__grid">
            <div className="villa__text" data-reveal>
              <h2 id="villa-title" className="display">Intimate &amp; Personal</h2>
              <p className="villa__sub">with only five suites and villas</p>
              <ul className="stats">
                {STATS.map(({ Icon, value, label }) => (
                  <li key={value} className="stats__item">
                    <Icon className="stats__icon" />
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              <Ornament className="villa__ornament" />
              <p className="villa__note">
                Created by two well-travelled Australians who split their time between Perth and Ubud, for couples,
                wellness retreats and groups booking the whole property.
              </p>
              <p className="villa__note villa__note--award">TripAdvisor Travelers&apos; Choice, every year from 2014 to 2020.</p>
            </div>
            <div className="oval" data-reveal-image>
              <div className="oval__stone">
                <figure className="oval__photo frame">
                  <Photo
                    name="pool-pavilions"
                    alt="Amori's infinity pool with thatched pavilions and tropical gardens behind"
                    sizes="(min-width: 64em) 120vh, 680px"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Suites & villa */}
        <section id="suites" className="screen dark dark--alt" aria-labelledby="suites-title">
          <div className="container suites">
            <header className="section-title" data-reveal>
              <h2 id="suites-title" className="caps-title">Suites &amp; Villa</h2>
              <p>Four suites and a one-bedroom villa, opening onto the gardens, the valley and the trees</p>
            </header>
            <SuiteCards />
            <p className="suites__footnote">
              <span className="suites__rule" aria-hidden="true" />
              <span>
                In every room: <DotList items={commonEssentials} />
              </span>
              <span className="suites__rule" aria-hidden="true" />
            </p>
          </div>
        </section>

        {/* The Amori Experience */}
        <section id="experiences" className="screen cream" aria-labelledby="experiences-title">
          <div className="container experiences">
            <header className="section-title section-title--dark" data-reveal>
              <h2 id="experiences-title" className="display display--dark">The Amori Experience</h2>
              <p>
                Ubud means medicine or healing. A day here can start with yoga in the bamboo pavilion and end with a
                massage and herbal body wrap.
              </p>
            </header>
            <ul className="exp-row">
              {experienceCards.map((card) => (
                <li key={card.title} className="exp-card" data-reveal-image>
                  <div className="exp-card__inner">
                    <figure className="exp-card__arch frame">
                      <Photo name={card.image} alt={card.alt} sizes="(min-width: 64em) 75vh, (min-width: 40em) 45vw, 90vw" />
                    </figure>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="exp-afield">
              <strong>Arranged by your butler:</strong> <DotList items={activities} />
            </p>
          </div>
        </section>

        {/* Yoga & wellness retreats */}
        <section id="wellness" className="screen dark wellness" aria-labelledby="wellness-title">
          <div className="container">
            <header className="wellness__head" data-reveal>
              <h2 id="wellness-title" className="caps-title caps-title--gold">
                <LeafIcon className="wellness__leaf" />
                Yoga &amp; Wellness Retreats
                <LeafIcon className="wellness__leaf wellness__leaf--flip" />
              </h2>
              <p className="wellness__kicker">
                <span aria-hidden="true" className="wellness__dash" />
                Wellness packages
                <span aria-hidden="true" className="wellness__dash" />
              </p>
              <p className="wellness__intro">
                Enliven body, mind and spirit with yoga, exercise, massage and diet. Every package includes
                accommodation in your choice of room.
              </p>
            </header>

            <div className="pkg" role="table" aria-label="Wellness packages compared">
              <div role="rowgroup">
                <div className="pkg__row pkg__row--head" role="row">
                  <span role="columnheader" className="pkg__label">
                    <span className="visually-hidden">Package</span>
                  </span>
                  {packageColumns.map((p) => (
                    <span key={p.id} role="columnheader" className={`pkg__cell pkg__head${featured(p)}`}>
                      <LeafIcon className="pkg__leaf" />
                      <span className="pkg__nights">{p.nights}</span>
                      <span className="pkg__days">{p.days}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div role="rowgroup">
                {PACKAGE_ROWS.map((row) => (
                  <div key={row.label} className="pkg__row" role="row">
                    <span role="rowheader" className="pkg__label">{row.label}</span>
                    {packageColumns.map((p) => (
                      <span key={p.id} role="cell" className={`pkg__cell${featured(p)}`}>
                        <span className="pkg__mobile-label" aria-hidden="true">{row.label}</span>
                        {row.render(p)}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="pkg__row pkg__row--actions" role="row">
                  <span role="cell" className="pkg__label" />
                  {packageColumns.map((p) => (
                    <span key={p.id} role="cell" className={`pkg__cell${featured(p)}`}>
                      <a
                        className={`pkg__button${p.id === "5" ? " pkg__button--gold" : ""}`}
                        href={whatsappLink(`Wellness package, ${p.nights}`)}
                        {...external}
                      >
                        Ask about {p.nights}
                        {newTab}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pkg-all" data-reveal>
              <figure className="pkg-all__photo frame">
                <Photo name="yoga-valley" alt="A guest in a seated yoga pose facing palm trees and the valley" sizes="(min-width: 64em) 34vw, 100vw" />
              </figure>
              <div className="pkg-all__text">
                <h3 className="caps-small">Included in all packages</h3>
                <ul className="leaf-list">
                  {packageCommon.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive-use group retreats */}
        <section id="retreats" className="screen cream" aria-labelledby="retreats-title">
          <div className="container retreats">
            <div className="blob" data-reveal-image>
              <figure className="blob__photo frame">
                <Photo name="yoga-group" alt="A retreat group practising yoga in the bamboo pavilion" sizes="(min-width: 64em) 70vw, 90vw" />
              </figure>
              <figure className="blob__inset frame">
                <Photo name="retreat-dinner" alt="A retreat group in white holding offerings at a closing dinner" sizes="240px" />
              </figure>
            </div>
            <div className="retreats__text" data-reveal>
              <h2 id="retreats-title" className="display display--dark">Exclusive-use group retreats</h2>
              <p className="retreats__lead">
                Retreat leaders and their groups can enjoy exclusive use of Amori: the accommodation, staff, open-air
                restaurant and lounge, infinity pool, jacuzzi, pool deck, terrace lawns and multi-purpose living
                pavilion.
              </p>
              <p>
                A magical location close to Ubud, a connection to the sacred Petanu River, personal service from local
                staff and immersion in the local banjar. Please enquire about dates this year or next; references from
                previous group leaders are available.
              </p>
              <a className="outline-button" href={whatsappLink("Group retreat")} {...external}>
                Enquire about a group retreat <ArrowIcon />
                {newTab}
              </a>
            </div>
          </div>
        </section>

        {/* Finding Amori + Plan your stay */}
        <section id="location" className="screen paper" aria-labelledby="location-title">
          <div className="container">
            <Ornament className="paper__ornament" />
            <div className="split">
              <div className="split__col" data-reveal>
                <h2 id="location-title" className="caps-title caps-title--dark">Finding Amori</h2>
                <span className="terra-rule" aria-hidden="true" />
                <p className="terra-sub">Beside the sacred Petanu River</p>
                <figure className="framed">
                  <div className="framed__inner frame">
                    <Photo
                      name="aerial"
                      alt="Aerial view of Amori Villas: thatched roofs and the pool set in dense jungle above the river valley"
                      sizes="(min-width: 64em) 42vw, 90vw"
                    />
                  </div>
                </figure>
                <p className="split__caption">Amori Villas</p>
                <p className="split__meta">
                  <PinIcon className="split__pin" />
                  <span>
                    {site.address[0]} • {site.address[1]}
                  </span>
                </p>
                <p className="split__meta split__meta--small">
                  <NavigateIcon className="split__nav" />
                  <span>
                    10 minutes from Ubud centre • Free shuttle to and from Ubud •{" "}
                    <a href={site.mapsUrl} {...external}>
                      Open in Google Maps{newTab}
                    </a>
                  </span>
                </p>
              </div>

              <div id="contact" className="split__col split__col--right" data-reveal>
                <h2 className="caps-title caps-title--dark">Plan your stay</h2>
                <span className="terra-rule" aria-hidden="true" />
                <h3 className="terra-sub">Booking terms</h3>
                <ul className="check-list">
                  {bookingTerms.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <h3 className="terra-sub">Every stay includes</h3>
                <ul className="check-list">
                  {inclusions.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <a className="pill pill--forest" href={whatsappLink()} {...external}>
                  <span className="pill__wa"><WhatsAppIcon /></span>
                  Enquire on WhatsApp
                  {newTab}
                </a>
                <p className="split__note">Send your dates and number of guests to ask about availability and rates.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__bar">
          <img
            src="/images/logo-white.webp"
            alt="Amori Villas, Luxury Ubud Retreat"
            width="440"
            height="251"
            loading="lazy"
            className="site-footer__logo"
          />
          <address className="site-footer__address">
            {site.address[0]}, {site.address[1]}
          </address>
          <ul className="site-footer__links">
            <li>
              <a href={whatsappLink()} {...external}>
                WhatsApp{newTab}
              </a>
            </li>
            <li>
              <a href={site.instagram.href} className="site-footer__social" {...external}>
                <InstagramIcon /> @{site.instagram.handle}
                {newTab}
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} {...external}>
                Google Maps{newTab}
              </a>
            </li>
          </ul>
          <p className="site-footer__copy">© {new Date().getFullYear()} Amori Villas</p>
        </div>
      </footer>
    </>
  );
}
