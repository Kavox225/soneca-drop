import 'tailwindcss/tailwind.css';
import '../styles/hero-neon.css';
import '../styles/global-neon.css';
import '../styles/header-neon.css';
import '../styles/footer-neon.css';
import '../styles/product-page-neon.css';
import '../styles/cart-neon.css';
import '../styles/home-sections.css';
import '../styles/shop-neon.css';
import '../styles/page-neon.css';
import Head from 'next/head';
import { CartProvider } from '@/hooks/use-shopping-cart';
import { LanguageProvider } from '@/context/LanguageContext';
import HeaderNeon from '@/components/HeaderNeon';
import FooterNeon from '@/components/FooterNeon';
import { Toaster } from 'react-hot-toast';
import { CURRENCY } from '@/lib/constants';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SONECA DROPS | Specialty Coffee. Priced like your supermarket trash!</title>
        <meta
          name="description"
          content="Specialty Coffee. Priced like your supermarket trash! Roasted in France. Shipped within 48h."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageProvider>
        <CartProvider currency={CURRENCY}>
          <div className="min-h-screen flex flex-col">
            <HeaderNeon />
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            <FooterNeon />
          </div>
        </CartProvider>
      </LanguageProvider>
      <Toaster />
    </>
  );
}

export default MyApp;
