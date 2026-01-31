import { useState, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import products, { getAllTags } from 'products';

export default function Shop() {
  const { t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState(null);
  const allTags = useMemo(() => getAllTags(), []);

  const filtered = useMemo(() => {
    if (!selectedTag) return products;
    return products.filter((p) => (p.tags || []).includes(selectedTag));
  }, [selectedTag]);

  return (
    <>
      <Head>
        <title>{t('shopTitle')} | SONECA DROPS</title>
      </Head>
      <div className="shop-neon">
        <div className="shop-neon__container">
          <h1 className="shop-neon__title">
            <span className="shop-neon__title-cyan">{t('shopTitle')}</span>
          </h1>

          {allTags.length > 0 && (
            <div className="shop-neon__filters">
              <span className="shop-neon__filter-label">{t('filterBy')}:</span>
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={`shop-neon__filter-btn ${selectedTag === null ? 'shop-neon__filter-btn--active' : ''}`}
              >
                {t('shopAllDrops')}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`shop-neon__filter-btn ${selectedTag === tag ? 'shop-neon__filter-btn--active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="shop-neon__empty">{t('noProducts')}</p>
          ) : (
            <div className="shop-neon__grid">
              {filtered.map((product) => {
                const minPrice = product.pricing?.size_250?.amount ?? 0;
                return (
                  <Link key={product.slug} href={`/products/${product.slug}`}>
                    <a className="shop-neon__card">
                      {product.image && (
                        <div className="shop-neon__card-img-wrap">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={280}
                            height={280}
                            objectFit="contain"
                            className="shop-neon__card-img"
                          />
                        </div>
                      )}
                      <div className="shop-neon__card-body">
                        <h2 className="shop-neon__card-name">{product.name}</h2>
                        <p className="shop-neon__card-short">{product.shortDescription}</p>
                        {product.tags && product.tags.length > 0 && (
                          <div className="shop-neon__card-tags">
                            {product.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="shop-neon__tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        {minPrice > 0 && (
                          <p className="shop-neon__card-price">
                            {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: product.currency || 'EUR',
                              minimumFractionDigits: 2,
                            }).format(minPrice / 100)}{' '}
                            – 250g
                          </p>
                        )}
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
