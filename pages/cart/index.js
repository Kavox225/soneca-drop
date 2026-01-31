import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import axios from 'axios';
import { formatCurrency } from '@/lib/utils';
import getStripe from '@/lib/get-stripe';
import {
  XCircleIcon,
  XIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';

const Cart = () => {
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id },
    } = await axios.post('/api/checkout_sessions', {
      items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <>
      <Head>
        <title>Cart | SONECA DROPS</title>
      </Head>
      <div className="cart-neon">
        <div className="cart-neon__container">
          {cartCount > 0 ? (
            <>
              <div className="cart-neon__header">
                <h2 className="cart-neon__title">Your Cart</h2>
                <p className="cart-neon__subtitle">
                  {cartCount} items{' '}
                  <button
                    onClick={clearCart}
                    className="cart-neon__clear-btn"
                  >
                    (Clear all)
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="cart-neon__header">
                <h2 className="cart-neon__title">Your cart is empty</h2>
                <p className="cart-neon__subtitle">
                  Check out our drops{' '}
                  <Link href="/">
                    <a className="cart-neon__link">here!</a>
                  </Link>
                </p>
              </div>
            </>
          )}

          {cartCount > 0 ? (
            <div className="cart-neon__items">
              {Object.entries(cartDetails).map(([key, product]) => (
                <div key={key} className="cart-neon__item">
                  {/* Image + Name */}
                  <Link href={`/products/${product.id}`}>
                    <a className="cart-neon__item-link">
                      <div className="cart-neon__item-image-wrapper">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <p className="cart-neon__item-name">{product.name}</p>
                    </a>
                  </Link>

                  {/* Price + Actions */}
                  <div className="cart-neon__item-actions">
                    {/* Quantity */}
                    <div className="cart-neon__quantity-controls">
                      <button
                        onClick={() => removeItem(product)}
                        disabled={product?.quantity <= 1}
                        className="cart-neon__quantity-btn"
                      >
                        <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                      </button>
                      <p className="cart-neon__quantity-value">{product.quantity}</p>
                      <button
                        onClick={() => addItem(product)}
                        className="cart-neon__quantity-btn"
                      >
                        <PlusSmIcon className="w-6 h-6 flex-shrink-0" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="cart-neon__item-price">
                      <XIcon className="w-4 h-4 text-gray-500 inline-block mr-1" />
                      {formatCurrency(product.price)}
                    </p>

                    {/* Remove item */}
                    <button
                      onClick={() => removeItem(product, product.quantity)}
                      className="cart-neon__remove-btn"
                    >
                      <XCircleIcon className="w-6 h-6 flex-shrink-0" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-neon__footer">
                <p className="cart-neon__total">
                  Total:{' '}
                  <span className="cart-neon__total-value">
                    {formatCurrency(totalPrice)}
                  </span>
                </p>

                <button
                  onClick={redirectToCheckout}
                  disabled={redirecting}
                  className="cart-neon__checkout-btn"
                >
                  {redirecting ? 'Redirecting...' : 'Go to Checkout'}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Cart;
