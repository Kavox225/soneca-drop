import Link from 'next/link';

const FooterNeon = () => (
  <footer className="footer-neon">
    <div className="footer-neon__container">
      <div className="footer-neon__content">
        <div className="footer-neon__brand">
          <h3 className="footer-neon__title">
            <span className="footer-neon__title-cyan">SONECA</span>
            <span className="footer-neon__title-pink"> DROPS</span>
          </h3>
          <p className="footer-neon__tagline">
            86+ Specialty Coffee. Priced like supermarket trash.
          </p>
        </div>

        <div className="footer-neon__links">
          <Link href="/">
            <a className="footer-neon__link">Home</a>
          </Link>
          <Link href="/#drops">
            <a className="footer-neon__link">Drops</a>
          </Link>
          <Link href="/cart">
            <a className="footer-neon__link">Cart</a>
          </Link>
        </div>
      </div>

      <div className="footer-neon__bottom">
        <p className="footer-neon__copyright">
          © 2026 SONECA DROPS. Drop culture. No fluff.
        </p>
      </div>

      <div className="footer-neon__glow" />
      <div className="footer-neon__scanline" />
    </div>
  </footer>
);

export default FooterNeon;
