import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FooterNeon() {
  const { t } = useLanguage();

  return (
    <footer className="footer-neon">
      <div className="footer-neon__container">
        <div className="footer-neon__content">
          <div className="footer-neon__brand">
            <h3 className="footer-neon__title">
              <span className="footer-neon__title-cyan">SONECA</span>
              <span className="footer-neon__title-pink"> DROPS</span>
            </h3>
            <p className="footer-neon__tagline">{t('slogan')}</p>
          </div>

          <div className="footer-neon__links">
            <Link href="/">
              <a className="footer-neon__link">{t('navHome')}</a>
            </Link>
            <Link href="/shop">
              <a className="footer-neon__link">{t('navShop')}</a>
            </Link>
            <Link href="/cart">
              <a className="footer-neon__link">{t('navCart')}</a>
            </Link>
            <Link href="/account">
              <a className="footer-neon__link">{t('navAccount')}</a>
            </Link>
            <Link href="/contact">
              <a className="footer-neon__link">{t('footerContact')}</a>
            </Link>
            <Link href="/legal/terms">
              <a className="footer-neon__link">{t('legalTerms')}</a>
            </Link>
            <Link href="/legal/privacy">
              <a className="footer-neon__link">{t('legalPrivacy')}</a>
            </Link>
            <Link href="/legal/mentions">
              <a className="footer-neon__link">{t('legalMentions')}</a>
            </Link>
          </div>
        </div>

        <div className="footer-neon__bottom">
          <p className="footer-neon__copyright">
            © {new Date().getFullYear()} SONECA DROPS. {t('slogan')}
          </p>
        </div>

        <div className="footer-neon__glow" />
        <div className="footer-neon__scanline" />
      </div>
    </footer>
  );
}
