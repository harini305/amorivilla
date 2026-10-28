export const metadata = {
  title: "Page not found | Amori Villas",
};

export default function NotFound() {
  return (
    <main className="not-found">
      <img src="/images/logo-green.webp" alt="Amori Villas" width="440" height="251" className="not-found__logo" loading="lazy" />
      <h1 className="heading-2">This page could not be found</h1>
      <p>The page may have moved when the site was rebuilt.</p>
      <a className="button" href="/">
        Return to the home page
      </a>
    </main>
  );
}
