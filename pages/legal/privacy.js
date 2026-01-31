import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('legalPrivacy')} | SONECA DROPS</title>
      </Head>
      <div className="page-neon page-neon--legal">
        <div className="page-neon__container">
          <h1 className="page-neon__title">{t('legalPrivacy')}</h1>
          <div className="page-neon__body">
            <p><strong>[Company Name]</strong> (“we”) processes your data in accordance with applicable data protection laws (including GDPR).</p>
            <p><strong>Data we collect</strong> When you order, we collect: name, email, address, and payment information (processed by Stripe; we do not store card numbers). If you sign up for drop alerts, we store your email.</p>
            <p><strong>Purpose</strong> To process orders, send confirmations, and (with your consent) send drop alerts and promos.</p>
            <p><strong>Retention</strong> Order data is retained as required for accounting and legal obligations. Email list: until you unsubscribe.</p>
            <p><strong>Your rights</strong> You may request access, correction, or deletion of your data. Contact [Contact email].</p>
            <p><strong>Cookies</strong> We use essential cookies for the shopping cart and session. No advertising cookies.</p>
          </div>
          <Link href="/">
            <a className="page-neon__back">← Back</a>
          </Link>
        </div>
      </div>
    </>
  );
}
