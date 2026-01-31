import Link from 'next/link';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import { CURRENCY } from '@/lib/constants';

export default function HeaderNeon() {
  const { totalPrice, cartCount } = useShoppingCart();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-neon ${scrolled ? 'header-neon--scrolled' : ''}`}>
      <div className="header-neon__container">
        <Link href="/">
          <a className="header-neon__logo">
            <span className="header-neon__logo-text">
              <span className="header-neon__logo-cyan">SONECA</span>
              <span className="header-neon__logo-pink"> DROPS</span>
            </span>
            <div className="header-neon__logo-glow" />
          </a>
        </Link>

        <nav className="header-neon__nav">
          <Link href="/">
            <a className="header-neon__nav-link">{t('navHome')}</a>
          </Link>
          <Link href="/shop">
            <a className="header-neon__nav-link">{t('navShop')}</a>
          </Link>
          <Link href="/contact">
            <a className="header-neon__nav-link">{t('navContact')}</a>
          </Link>

          <div className="header-neon__lang">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`header-neon__lang-btn ${lang === 'en' ? 'header-neon__lang-btn--active' : ''}`}
              aria-label="English"
            >
              EN
            </button>
            <span className="header-neon__lang-sep">/</span>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`header-neon__lang-btn ${lang === 'fr' ? 'header-neon__lang-btn--active' : ''}`}
              aria-label="Français"
            >
              FR
            </button>
          </div>

          <Link href="/cart">
            <a className="header-neon__cart">
              <div className="header-neon__cart-icon-wrapper">
                <ShoppingCartIcon className="header-neon__cart-icon" />
                {cartCount > 0 && (
                  <span className="header-neon__cart-badge">{cartCount}</span>
                )}
                <div className="header-neon__cart-glow" />
              </div>
              <div className="header-neon__cart-price">
                <span className="header-neon__cart-price-value">
                  {formatCurrency(totalPrice, CURRENCY)}
                </span>
              </div>
            </a>
          </Link>
        </nav>
      </div>
      <div className="header-neon__scanline" />
    </header>
  );
}
