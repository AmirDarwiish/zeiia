import { createContext, useContext, useState } from 'react';
import translations from '../data/translations';

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('zeiia-lang') || 'ar';
  });

  const isRtl     = lang === 'ar';
  const t         = translations[lang];
  const toggleLang = () => setLang(l => {
    const next = l === 'ar' ? 'en' : 'ar';
    localStorage.setItem('zeiia-lang', next);
    return next;
  });

  return (
    <LangContext.Provider value={{ lang, isRtl, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);