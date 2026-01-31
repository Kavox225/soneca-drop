import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Mentions() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('legalMentions')} | SONECA DROPS</title>
      </Head>
      <div className="page-neon page-neon--legal">
        <div className="page-neon__container">
          <h1 className="page-neon__title">{t('legalMentions')}</h1>
          <div className="page-neon__body">
            <p><strong>Editor</strong></p>
            <p>[Company Name]</p>
            <p>[Address]</p>
            <p>[Contact email]</p>
            <p><strong>Hosting</strong></p>
            <p>[Hosting provider – e.g. Vercel / Netlify]</p>
            <p><strong>Payment</strong></p>
            <p>Stripe – <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="page-neon__link">stripe.com</a></p>
          </div>
          <Link href="/">
            <a className="page-neon__back">← Back</a>
          </Link>
        </div>
      </div>
    </>
  );
}
