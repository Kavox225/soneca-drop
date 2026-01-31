import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import { getProductBySlug } from 'products';
import { CURRENCY } from '@/lib/constants';

const SIZE_KEYS = ['size_250', 'size_500', 'size_1000'];
const SIZE_LABELS = { size_250: '250g (1 bag)', size_500: '500g (2 bags)', size_1000: '1kg (4 bags)' };
const SIZE_LABELS_FR = { size_250: '250g (1 sachet)', size_500: '500g (2 sachets)', size_1000: '1kg (4 sachets)' };

export default function ProductPage({ product }) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { addItem, cartCount } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [subscriptionInterval, setSubscriptionInterval] = useState('15');
  const [selectedSize, setSelectedSize] = useState('size_250');
  const toastId = useRef();
  const firstRun = useRef(true);

  const sizeLabels = lang === 'fr' ? SIZE_LABELS_FR : SIZE_LABELS;
  const pricing = product?.pricing || {};
  const selectedPricing = pricing[selectedSize];
  const priceId = selectedPricing?.priceId;
  const amount = selectedPricing?.amount ?? 0;
  const currency = product?.currency || CURRENCY;

  const handleAddToCart = () => {
    if (!priceId || amount <= 0) return;
    setAdding(true);
    toastId.current = toast.loading(t('addToCart') + '...');

    const cartItem = {
      id: priceId,
      price: amount,
      quantity: qty,
      name: `${product.name} – ${sizeLabels[selectedSize]}`,
      image: product.image || null,
      slug: product.slug,
      currency,
    };

    addItem(cartItem, qty);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (adding) {
      setAdding(false);
      toast.success(`${qty} ${product?.name} ${t('addToCart')}`, { id: toastId.current });
      setQty(1);
    }
  }, [cartCount]);

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };

  if (router.isFallback || !product) {
    return (
      <>
        <Head><title>Loading... | SONECA DROPS</title></Head>
        <div className="product-page-neon">
          <div className="product-page-neon__container">
            <p className="product-page-neon__loading">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  const optionalFields = [
    { key: 'origin', label: t('optionalOrigin') },
    { key: 'cooperative', label: t('optionalProducer') },
    { key: 'variety', label: t('optionalVariety') },
    { key: 'process', label: t('optionalProcess') },
    { key: 'altitude', label: t('optionalAltitude') },
    { key: 'tastingNotes', label: t('optionalTastingNotes') },
  ].filter(({ key }) => product[key]);

  return (
    <>
      <Head>
        <title>{product.name} | SONECA DROPS</title>
        <meta name="description" content={product.shortDescription} />
      </Head>
      <div className="product-page-neon">
        <div className="product-page-neon__container">
          <div className="product-page-neon__grid">
            {product.image && (
              <div className="product-page-neon__image-wrapper">
                <div className="product-page-neon__image-glow" />
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="product-page-neon__image"
                />
              </div>
            )}

            <div className="product-page-neon__details">
              <h1 className="product-page-neon__title">{product.name}</h1>
              {product.shortDescription && (
                <p className="product-page-neon__short">{product.shortDescription}</p>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="product-page-neon__tags">
                  {product.tags.map((tag) => (
                    <span key={tag} className="product-page-neon__tag">{tag}</span>
                  ))}
                </div>
              )}

              {optionalFields.length > 0 && (
                <div className="product-page-neon__optional">
                  {optionalFields.map(({ key, label }) => (
                    <p key={key} className="product-page-neon__optional-row">
                      <strong>{label}:</strong> {product[key]}
                    </p>
                  ))}
                </div>
              )}

              {product.longDescription && (
                <div className="product-page-neon__story">
                  <p>{product.longDescription}</p>
                </div>
              )}

              <div className="product-page-neon__purchase">
                <p className="product-page-neon__price-label">{t('sizeLabel')}</p>
                <div className="product-page-neon__size-options">
                  {SIZE_KEYS.filter((k) => pricing[k]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSize(key)}
                      className={`product-page-neon__size-btn ${selectedSize === key ? 'product-page-neon__size-btn--active' : ''}`}
                    >
                      {sizeLabels[key]}
                    </button>
                  ))}
                </div>

                {amount > 0 && (
                  <p className="product-page-neon__price-value">
                    {formatCurrency(amount, currency)}
                  </p>
                )}

                {product.subscriptionEnabled && (
                  <>
                    <p className="product-page-neon__price-label">{t('oneTime')} / {t('subscribe')}</p>
                    <div className="product-page-neon__purchase-type">
                      <button
                        type="button"
                        onClick={() => setPurchaseType('one-time')}
                        className={`product-page-neon__type-btn ${purchaseType === 'one-time' ? 'product-page-neon__type-btn--active' : ''}`}
                      >
                        {t('oneTime')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPurchaseType('subscription')}
                        className={`product-page-neon__type-btn ${purchaseType === 'subscription' ? 'product-page-neon__type-btn--active' : ''}`}
                      >
                        {t('subscribe')}
                      </button>
                    </div>
                    {purchaseType === 'subscription' && (
                      <div className="product-page-neon__subscription-options">
                        <button
                          type="button"
                          onClick={() => setSubscriptionInterval('15')}
                          className={`product-page-neon__sub-btn ${subscriptionInterval === '15' ? 'product-page-neon__sub-btn--active' : ''}`}
                        >
                          {t('every15days')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSubscriptionInterval('30')}
                          className={`product-page-neon__sub-btn ${subscriptionInterval === '30' ? 'product-page-neon__sub-btn--active' : ''}`}
                        >
                          {t('every30days')}
                        </button>
                      </div>
                    )}
                  </>
                )}

                <p className="product-page-neon__quantity-label">{t('quantity')}</p>
                <div className="product-page-neon__quantity-controls">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    disabled={qty <= 1}
                    className="product-page-neon__quantity-btn"
                  >
                    <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                  </button>
                  <p className="product-page-neon__quantity-value">{qty}</p>
                  <button
                    type="button"
                    onClick={() => setQty((prev) => prev + 1)}
                    className="product-page-neon__quantity-btn"
                  >
                    <PlusSmIcon className="w-6 h-6 flex-shrink-0" />
                  </button>
                </div>

                <div className="product-page-neon__actions">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={adding || !priceId}
                    className="product-page-neon__add-btn"
                  >
                    <span className="product-page-neon__add-btn-text">{t('addToCart')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={adding || !priceId}
                    className="product-page-neon__add-btn product-page-neon__add-btn--secondary"
                  >
                    <span className="product-page-neon__add-btn-text">{t('buyNow')}</span>
                  </button>
                </div>
              </div>

              <div className="product-page-neon__trust">
                <span className="product-page-neon__trust-item">{t('trustShipped')}</span>
                <span className="product-page-neon__trust-item">{t('trustRoasted')}</span>
                <span className="product-page-neon__trust-item">{t('trustStripe')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = (await import('products')).default;
  const paths = products.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { getProductBySlug } = await import('products');
  const product = getProductBySlug(params.slug) || null;
  if (!product) return { notFound: true };
  return { props: { product }, revalidate: 60 };
}
