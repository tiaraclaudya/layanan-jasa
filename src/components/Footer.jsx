export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <span className="footer__brand">
            <span className="navbar__brand-mark" aria-hidden="true" />
            Loka Studio
          </span>
          <p className="footer__tagline">Membangun produk web yang jelas, cepat, dan tahan lama.</p>
        </div>
        <p className="footer__meta">© {new Date().getFullYear()} Loka Studio. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
