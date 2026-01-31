import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import Image from 'next/image';
import Head from 'next/head';
import { formatCurrency } from '@/lib/utils';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';

import products from 'products';

const Product = props => {
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = () => {
    setAdding(true);
    toastId.current = toast.loading(
      `Adding ${qty} item${qty > 1 ? 's' : ''}...`
    );
    addItem(props, qty);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAdding(false);
    toast.success(`${qty} ${props.name} added`, {
      id: toastId.current,
    });
    setQty(1);
  }, [cartCount]);

  return router.isFallback ? (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <p className="text-center text-lg py-12">Loading...</p>
    </>
  ) : (
    <>
      <Head>
        <title>{props.name} | SONECA DROPS</title>
      </Head>
      <div className="product-page-neon">
        <div className="product-page-neon__container">
          <div className="product-page-neon__grid">
            {/* Product's image */}
            <div className="product-page-neon__image-wrapper">
              <div className="product-page-neon__image-glow" />
              <Image
                src={props.image}
                alt={props.name}
                layout="fill"
                objectFit="contain"
                className="product-page-neon__image"
              />
            </div>

            {/* Product's details */}
            <div className="product-page-neon__details">
              <h2 className="product-page-neon__title">{props.name}</h2>
              <div className="product-page-neon__availability">
                <span className="product-page-neon__availability-dot" />
                <span>In stock</span>
              </div>

              {/* Price */}
              <div className="product-page-neon__price-section">
                <p className="product-page-neon__price-label">Price</p>
                <p className="product-page-neon__price-value">
                  {formatCurrency(props.price)}
                </p>
              </div>

              <div className="product-page-neon__quantity-section">
                {/* Quantity */}
                <p className="product-page-neon__quantity-label">Quantity</p>
                <div className="product-page-neon__quantity-controls">
                  <button
                    onClick={() => setQty(prev => prev - 1)}
                    disabled={qty <= 1}
                    className="product-page-neon__quantity-btn"
                  >
                    <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                  </button>
                  <p className="product-page-neon__quantity-value">{qty}</p>
                  <button
                    onClick={() => setQty(prev => prev + 1)}
                    className="product-page-neon__quantity-btn"
                  >
                    <PlusSmIcon className="w-6 h-6 flex-shrink-0" />
                  </button>
                </div>

                {/* Add to cart button */}
                <button
                  type="button"
                  onClick={handleOnAddToCart}
                  disabled={adding}
                  className="product-page-neon__add-btn"
                >
                  <span className="product-page-neon__add-btn-text">
                    Add to cart ({qty})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    // Existing posts are rendered to HTML at build time
    paths: Object.keys(products)?.map(id => ({
      params: { id },
    })),
    // Enable statically generating additional pages
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const props = products?.find(product => product.id === params.id) ?? {};

    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Product;
