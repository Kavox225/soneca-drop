import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLang, supportedLangs } from '@/lib/translations';

const STORAGE_KEY = 'soneca_lang';

const LanguageContext = createContext({
  lang: defaultLang,
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && supportedLangs.includes(stored)) {
        setLangState(stored);
      }
    } catch (_) {}
    setMounted(true);
  }, []);

  const setLang = (newLang) => {
    if (!supportedLangs.includes(newLang)) return;
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (_) {}
  };

  const t = (key) => {
    const dict = translations[lang] || translations[defaultLang];
    return dict[key] != null ? dict[key] : (translations[defaultLang][key] ?? key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
