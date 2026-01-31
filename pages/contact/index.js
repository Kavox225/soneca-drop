import { useState } from 'react';
import Head from 'next/head';
import { useLanguage } from '@/context/LanguageContext';

const CONTACT_EMAIL = 'contact@sonecadrops.com';

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => {});
  };

  return (
    <>
      <Head>
        <title>{t('contactTitle')} | SONECA DROPS</title>
      </Head>
      <div className="page-neon">
        <div className="page-neon__container">
          <h1 className="page-neon__title">{t('contactTitle')}</h1>
          <p className="page-neon__contact-email">
            {t('contactEmail')}:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="page-neon__link">
              {CONTACT_EMAIL}
            </a>
          </p>
          {submitted ? (
            <p className="page-neon__success">{t('contactSuccess')}</p>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot"
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="contact-form__hp" aria-hidden="true">
                <label>Don’t fill: <input name="bot" tabIndex={-1} autoComplete="off" /></label>
              </p>
              <div className="contact-form__row">
                <label className="contact-form__label">{t('contactFormName')}</label>
                <input type="text" name="name" required className="contact-form__input" />
              </div>
              <div className="contact-form__row">
                <label className="contact-form__label">{t('contactFormEmail')}</label>
                <input type="email" name="email" required className="contact-form__input" />
              </div>
              <div className="contact-form__row">
                <label className="contact-form__label">{t('contactFormMessage')}</label>
                <textarea name="message" rows={5} required className="contact-form__textarea" />
              </div>
              <button type="submit" className="neon-btn neon-btn--primary">
                {t('contactSend')}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
