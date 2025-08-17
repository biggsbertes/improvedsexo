import { useState, useCallback } from 'react';
import { Language, getTranslation, translations } from '@/lib/translations';

type TranslationKey = keyof typeof translations.pt;

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');

  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
  }, []);

  const t = useCallback((key: TranslationKey) => {
    return getTranslation(currentLanguage, key);
  }, [currentLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};
