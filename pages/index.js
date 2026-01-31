import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useLanguage } from '@/context/LanguageContext';
import NeonHero from '@/components/NeonHero';
import { getFeaturedProduct } from 'products';

export default function Home() {
  const { t } = useLanguage();
  const featured = getFeaturedProduct();
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setEmailSubmitted(true))
      .catch(() => {});
  };

  return (
    <>
      <Head>
        <title>SONECA DROPS | {t('slogan')}</title>
        <meta name="description" content={t('slogan')} />
      </Head>

      {/* 1) Hero */}
      <section className="home-hero">
        <NeonHero
          primaryCtaHref={featured ? `/products/${featured.slug}` : '/shop'}
          secondaryCtaHref="#current-drop"
          heroCtaLabel={t('heroCta')}
          heroCtaSecondary={t('heroCtaSecondary')}
          slogan={t('slogan')}
        />
      </section>

      {/* 2) Trust badges */}
      <section className="home-badges" aria-label="Trust badges">
        <div className="home-badges__inner">
          <span className="home-badges__item">
            <span className="home-badges__dot" />
            {t('badgeRoasted')}
          </span>
          <span className="home-badges__item">
            <span className="home-badges__dot" />
            {t('badgeSpecialty')}
          </span>
          <span className="home-badges__item">
            <span className="home-badges__dot" />
            {t('badgeSecure')}
          </span>
          <span className="home-badges__item">
            <span className="home-badges__dot" />
            {t('badgeTraceability')}
          </span>
          <span className="home-badges__item">
            <span className="home-badges__dot home-badges__dot--cyan" />
            {t('badgeShipped')}
          </span>
        </div>
      </section>

      {/* 3) Current Drop */}
      {featured && (
        <section id="current-drop" className="home-current-drop">
          <div className="home-section__container">
            <h2 className="home-section__title">
              <span className="home-section__title-cyan">{t('currentDrop')}</span>
            </h2>
            <div className="home-current-drop__card">
              <Link href={`/products/${featured.slug}`}>
                <a className="home-current-drop__link">
                  {featured.image && (
                    <div className="home-current-drop__img-wrap">
                      <img
                        src={featured.image}
                        alt={featured.name}
                        className="home-current-drop__img"
                      />
                    </div>
                  )}
                  <div className="home-current-drop__body">
                    <h3 className="home-current-drop__name">{featured.name}</h3>
                    <p className="home-current-drop__short">{featured.shortDescription}</p>
                    <span className="home-current-drop__cta">{t('heroCta')}</span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4) How Drops Work */}
      <section id="how-drops-work" className="home-how">
        <div className="home-section__container">
          <h2 className="home-section__title">
            <span className="home-section__title-pink">{t('howDropsWork')}</span>
          </h2>
          <div className="home-how__steps">
            <div className="home-how__step">
              <span className="home-how__num">1</span>
              <h3 className="home-how__step-title">{t('step1Title')}</h3>
              <p className="home-how__step-desc">{t('step1Desc')}</p>
            </div>
            <div className="home-how__step">
              <span className="home-how__num">2</span>
              <h3 className="home-how__step-title">{t('step2Title')}</h3>
              <p className="home-how__step-desc">{t('step2Desc')}</p>
            </div>
            <div className="home-how__step">
              <span className="home-how__num">3</span>
              <h3 className="home-how__step-title">{t('step3Title')}</h3>
              <p className="home-how__step-desc">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Email capture – Netlify Forms */}
      <section id="drop-alerts" className="home-email">
        <div className="home-section__container">
          <h2 className="home-section__title">
            <span className="home-section__title-cyan">{t('dropAlerts')}</span>
          </h2>
          <p className="home-email__hint">{t('dropAlertsHint')}</p>
          {emailSubmitted ? (
            <p className="home-email__success" data-visible>
              {t('dropAlertsSuccess')}
            </p>
          ) : (
            <form
              name="drop-alerts"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot"
              className="home-email__form"
              onSubmit={handleEmailSubmit}
            >
              <input type="hidden" name="form-name" value="drop-alerts" />
              <p className="home-email__hp" aria-hidden="true">
                <label>
                  Don’t fill this: <input name="bot" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <div className="home-email__row">
                <input
                  type="email"
                  name="email"
                  placeholder={t('dropAlertsPlaceholder')}
                  required
                  className="home-email__input"
                  aria-label="Email"
                />
                <button type="submit" className="home-email__btn">
                  {t('dropAlertsSubmit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
