"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/Photo";
import { WhatsAppIcon, CloseIcon, ArrowIcon } from "@/components/Icons";
import { suites, wholeProperty, whatsappLink } from "@/lib/content";

const CARD_SIZES = "(min-width: 64em) 24vw, (min-width: 40em) 45vw, 90vw";

function Features({ items }) {
  return (
    <p className="suite-card__features">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span aria-hidden="true"> • </span>}
          {item}
        </span>
      ))}
    </p>
  );
}

// Arched room cards; each opens a dialog with the room's photos and details.
export default function SuiteCards() {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [photo, setPhoto] = useState(0);
  const suite = open === null ? null : suites[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (suite && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("menu-open");
    }
  }, [suite]);

  const show = (index, event) => {
    openerRef.current = event.currentTarget;
    setPhoto(0);
    setOpen(index);
  };

  const close = () => dialogRef.current?.close();

  const onClose = () => {
    document.documentElement.classList.remove("menu-open");
    setOpen(null);
    openerRef.current?.focus();
  };

  return (
    <>
      <ul className="suite-grid">
        {suites.map((item, index) => (
          <li key={item.id} className={`suite-card suite-card--${(index % 3) + 1}`}>
            <figure className="suite-card__arch frame">
              <Photo name={item.images[0].name} alt={item.images[0].alt} sizes={CARD_SIZES} />
            </figure>
            <h3 className="suite-card__name">{item.name}</h3>
            <Features items={item.features} />
            <button type="button" className="suite-card__open" onClick={(event) => show(index, event)}>
              View details<span className="visually-hidden"> of the {item.name} suite</span> <ArrowIcon />
            </button>
          </li>
        ))}
        <li className="suite-card suite-card--3">
          <figure className="suite-card__arch frame">
            <Photo name={wholeProperty.image.name} alt={wholeProperty.image.alt} sizes={CARD_SIZES} />
          </figure>
          <h3 className="suite-card__name">{wholeProperty.name}</h3>
          <Features items={wholeProperty.features} />
          <a className="suite-card__open" href="#retreats">
            Group retreats <ArrowIcon />
          </a>
        </li>
      </ul>

      <dialog
        ref={dialogRef}
        className="suite-dialog"
        aria-labelledby="suite-dialog-title"
        onClose={onClose}
        onClick={(event) => event.target === dialogRef.current && close()}
      >
        {suite && (
          <div className="suite-dialog__panel">
            <button type="button" className="suite-dialog__close" onClick={close}>
              <CloseIcon />
              <span className="visually-hidden">Close</span>
            </button>
            <div className="suite-dialog__media">
              <div className="suite-dialog__main frame">
                <Photo
                  key={suite.images[photo].name}
                  name={suite.images[photo].name}
                  alt={suite.images[photo].alt}
                  sizes="(min-width: 64em) 560px, 90vw"
                />
              </div>
              <div className="suite-dialog__thumbs">
                {suite.images.map((image, i) => (
                  <button
                    key={image.name}
                    type="button"
                    className="suite-dialog__thumb frame"
                    aria-pressed={i === photo}
                    aria-label={`Show photo ${i + 1} of ${suite.images.length}: ${image.alt}`}
                    onClick={() => setPhoto(i)}
                  >
                    <Photo name={image.name} alt="" sizes="96px" />
                  </button>
                ))}
              </div>
            </div>
            <div className="suite-dialog__body">
              <p className="suite-dialog__type">{suite.type}</p>
              <h3 id="suite-dialog-title" className="suite-dialog__name">{suite.name}</h3>
              <p>{suite.description}</p>
              <dl className="suite-dialog__details">
                <div>
                  <dt>Bedding</dt>
                  <dd>{suite.bedding}</dd>
                </div>
                <div>
                  <dt>Essentials</dt>
                  <dd>{suite.essentials}</dd>
                </div>
              </dl>
              <a
                className="pill pill--forest"
                href={whatsappLink(`${suite.type} (${suite.name})`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="pill__wa"><WhatsAppIcon /></span>
                Ask about {suite.name}
                <span className="visually-hidden"> (opens WhatsApp in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
