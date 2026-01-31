import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import axios from 'axios';
import { formatCurrency } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD_CENTS, SHIPPING_FEE_CENTS, CURRENCY } from '@/lib/constants';
import getStripe from '@/lib/get-stripe';
import { useLanguage } from '@/context/LanguageContext';
import {
  XCircleIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';

export default function Cart() {
  const { t, lang } = useLanguage();
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);
  const [deliveryType, setDeliveryType] = useState('home');
  const [pickupNotes, setPickupNotes] = useState('');

  const subtotalCents = totalPrice;
  const shippingCents =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FEE_CENTS;
  const totalCents = subtotalCents + shippingCents;

  const redirectToCheckout = async () => {
    setRedirecting(true);
    try {
      const { data } = await axios.post('/api/checkout_sessions', {
        items: Object.entries(cartDetails).map(([, item]) => ({
          price: item.id,
          quantity: item.quantity,
        })),
        subtotalInCents: subtotalCents,
        metadata: {
          deliveryType: deliveryType || 'home',
          pickupNotes: deliveryType === 'pickup' ? pickupNotes : '',
        },
      });

      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      setRedirecting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('cartTitle')} | SONECA DROPS</title>
      </Head>
      <div className="cart-neon">
        <div className="cart-neon__container">
          {cartCount > 0 ? (
            <div className="cart-neon__header">
              <h2 className="cart-neon__title">{t('cartTitle')}</h2>
              <p className="cart-neon__subtitle">
                {cartCount} {cartCount === 1 ? t('cartItem') : t('cartItems')}{' '}
                <button type="button" onClick={clearCart} className="cart-neon__clear-btn">
                  ({t('cartClear')})
                </button>
              </p>
            </div>
          ) : (
            <div className="cart-neon__header">
              <h2 className="cart-neon__title">{t('cartEmpty')}</h2>
              <p className="cart-neon__subtitle">
                {t('cartCheckoutDrops')}{' '}
                <Link href="/shop">
                  <a className="cart-neon__link">{t('cartHere')}</a>
                </Link>
              </p>
            </div>
          )}

          {cartCount > 0 && (
            <div className="cart-neon__items">
              {Object.entries(cartDetails).map(([key, item]) => (
                <div key={key} className="cart-neon__item">
                  <Link href={item.slug ? `/products/${item.slug}` : '/shop'}>
                    <a className="cart-neon__item-link">
                      {item.image && (
                        <div className="cart-neon__item-image-wrapper">
                          <Image
                            src={item.image}
                            alt={item.name || ''}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      )}
                      <p className="cart-neon__item-name">{item.name || `Item ${key}`}</p>
                    </a>
                  </Link>
                  <div className="cart-neon__item-actions">
                    <div className="cart-neon__quantity-controls">
                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        disabled={item?.quantity <= 1}
                        className="cart-neon__quantity-btn"
                      >
                        <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                      </button>
                      <p className="cart-neon__quantity-value">{item.quantity}</p>
                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        className="cart-neon__quantity-btn"
                      >
                        <PlusSmIcon className="w-6 h-6 flex-shrink-0" />
                      </button>
                    </div>
                    <p className="cart-neon__item-price">
                      {formatCurrency((item.price || 0) * (item.quantity || 1), item.currency || CURRENCY)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item, item.quantity)}
                      className="cart-neon__remove-btn"
                      aria-label="Remove"
                    >
                      <XCircleIcon className="w-6 h-6 flex-shrink-0" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-neon__delivery">
                <p className="cart-neon__delivery-label">{t('shipping')}</p>
                <div className="cart-neon__delivery-options">
                  <label className="cart-neon__radio">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryType === 'home'}
                      onChange={() => setDeliveryType('home')}
                    />
                    <span>{t('deliveryHome')}</span>
                  </label>
                  <label className="cart-neon__radio">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryType === 'pickup'}
                      onChange={() => setDeliveryType('pickup')}
                    />
                    <span>{t('deliveryPickup')}</span>
                  </label>
                </div>
                {deliveryType === 'pickup' && (
                  <textarea
                    className="cart-neon__pickup-notes"
                    placeholder={t('pickupPlaceholder')}
                    value={pickupNotes}
                    onChange={(e) => setPickupNotes(e.target.value)}
                    rows={2}
                  />
                )}
              </div>

              <div className="cart-neon__footer">
                <p className="cart-neon__summary-line">
                  {t('subtotal')}:{' '}
                  <span className="cart-neon__summary-value">
                    {formatCurrency(subtotalCents, CURRENCY)}
                  </span>
                </p>
                <p className="cart-neon__summary-line">
                  {t('shipping')}:{' '}
                  <span className="cart-neon__summary-value">
                    {shippingCents === 0 ? t('freeShipping') : formatCurrency(shippingCents, CURRENCY)}
                  </span>
                </p>
                <p className="cart-neon__shipping-rule">{t('shippingRule')}</p>
                <p className="cart-neon__total">
                  {t('total')}:{' '}
                  <span className="cart-neon__total-value">
                    {formatCurrency(totalCents, CURRENCY)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={redirectToCheckout}
                  disabled={redirecting}
                  className="cart-neon__checkout-btn"
                >
                  {redirecting ? t('redirecting') : t('goToCheckout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
