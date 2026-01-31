import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Account() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('navAccount')} | SONECA DROPS</title>
      </Head>
      <div className="page-neon">
        <div className="page-neon__container">
          <div className="account-banner">
            <p className="account-banner__text">{t('accountBanner')}</p>
          </div>
          <h1 className="page-neon__title">{t('navAccount')}</h1>
          <div className="account-sections">
            <section className="account-section">
              <h2 className="account-section__title">{t('accountLogin')} / {t('accountRegister')}</h2>
              <p className="account-section__desc">
                Account creation is available at checkout. Complete your order as a guest, then create an account to manage subscriptions, invoices, and saved addresses.
              </p>
              <Link href="/shop">
                <a className="neon-btn neon-btn--primary">{t('navShop')}</a>
              </Link>
            </section>
            <section className="account-section">
              <h2 className="account-section__title">{t('accountOrders')}</h2>
              <p className="account-section__desc">
                After checkout, you can access your order history and receipts from your Stripe customer portal or confirmation email.
              </p>
            </section>
            <section className="account-section">
              <h2 className="account-section__title">{t('accountSubscription')}</h2>
              <p className="account-section__desc">
                {t('accountSubscriptionPreference')}: choose Subscribe & save on any product page. Subscription options (1kg every 15 or 30 days) are stored with your order.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
