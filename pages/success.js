import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { useLanguage } from '@/context/LanguageContext';
import { fetcher, shootFireworks } from '@/lib/utils';
import { CheckIcon } from '@heroicons/react/outline';

export default function Success() {
  const { query: { session_id } } = useRouter();
  const { clearCart } = useShoppingCart();
  const { t, lang } = useLanguage();

  const { data, error } = useSWR(
    () => (session_id ? `/api/checkout_sessions/${session_id}` : null),
    fetcher
  );

  useEffect(() => {
    if (data) {
      shootFireworks();
      clearCart();
    }
  }, [data]);

  return (
    <div className="page-neon">
      <div className="page-neon__container">
        <div className="success-box">
          {error ? (
            <div className="success-box__error">
              <p>{lang === 'fr' ? 'Une erreur s\'est produite.' : 'Something went wrong.'}</p>
            </div>
          ) : !data ? (
            <p className="success-box__loading">
              {lang === 'fr' ? 'Chargement...' : 'Loading...'}
            </p>
          ) : (
            <>
              <CheckIcon className="success-box__icon" />
              <h1 className="success-box__title">
                {lang === 'fr' ? 'Merci pour ta commande !' : 'Thanks for your order!'}
              </h1>
              <p className="success-box__desc">
                {lang === 'fr' ? 'Vérifie ta boîte mail pour le reçu.' : 'Check your inbox for the receipt.'}
              </p>
              <p className="success-box__encourage">{t('checkoutEncourage')}</p>
              <Link href="/shop">
                <a className="neon-btn neon-btn--primary">
                  {t('navShop')}
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
