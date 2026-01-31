import Link from 'next/link';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';

const HeaderNeon = () => {
  const { totalPrice, cartCount } = useShoppingCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </a>
        </Link>
      </div>
      <div className="header-neon__scanline" />
    </header>
  );
};

export default HeaderNeon;
