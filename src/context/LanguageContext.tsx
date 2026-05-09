import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { labels, LanguageCode, TranslationKey } from "../constants/text";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const STORAGE_KEY = "@cabocash_language";
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<LanguageCode>("pt");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "pt" || stored === "en") {
        setLanguageState(stored);
      }
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        AsyncStorage.setItem(STORAGE_KEY, nextLanguage).catch(() => undefined);
      },
      t: (key) => labels[language][key]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
