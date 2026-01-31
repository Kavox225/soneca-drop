import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Terms() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('legalTerms')} | SONECA DROPS</title>
      </Head>
      <div className="page-neon page-neon--legal">
        <div className="page-neon__container">
          <h1 className="page-neon__title">{t('legalTerms')}</h1>
          <div className="page-neon__body">
            <p><strong>[Company Name]</strong></p>
            <p>[Address]</p>
            <p>[Registration number / SIRET if applicable]</p>
            <p>These Terms and Conditions govern the use of the SONECA DROPS website and the purchase of products. By placing an order, you agree to these terms.</p>
            <p><strong>1. Products & pricing</strong> Prices are in EUR and include VAT where applicable. We reserve the right to correct pricing errors.</p>
            <p><strong>2. Orders</strong> Orders are subject to acceptance. We will confirm your order by email. France only for shipping.</p>
            <p><strong>3. Payment</strong> Payment is processed securely via Stripe. We do not store your full card details.</p>
            <p><strong>4. Shipping</strong> Shipped within 48h. 5€ shipping; free from 40€. Home delivery or pickup point as selected at checkout.</p>
            <p><strong>5. Returns</strong> [Placeholder: insert your return policy.]</p>
            <p><strong>6. Contact</strong> [Contact email] for any questions.</p>
          </div>
          <Link href="/">
            <a className="page-neon__back">← Back</a>
          </Link>
        </div>
      </div>
    </>
  );
}
