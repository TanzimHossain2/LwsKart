import { useContext } from "react";

import { LanguageContext } from "../context";

export const useLanguage = () => {
  if (!LanguageContext) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  const { lang, setLang } : any = useContext(LanguageContext);

  return { lang, setLang };
};
