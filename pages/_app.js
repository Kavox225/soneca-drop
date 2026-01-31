import 'tailwindcss/tailwind.css';
import '../styles/hero-neon.css';
import '../styles/global-neon.css';
import '../styles/product-card-3d.css';
import '../styles/header-neon.css';
import '../styles/footer-neon.css';
import '../styles/drops-section.css';
import '../styles/rating-neon.css';
import '../styles/product-page-neon.css';
import '../styles/cart-neon.css';
import Head from 'next/head';
import { CartProvider } from '@/hooks/use-shopping-cart';
import HeaderNeon from '@/components/HeaderNeon';
import FooterNeon from '@/components/FooterNeon';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          SONECA DROPS | 86+ Specialty Coffee. Priced like supermarket trash.
        </title>
        <meta
          name="description"
          content="Ultra limited drops. 86+ Specialty Coffee. Drop culture. No fluff. Roasted in France."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <HeaderNeon />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <FooterNeon />
        </div>
      </CartProvider>
      <Toaster />
    </>
  );
}

export default MyApp;
