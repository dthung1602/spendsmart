import { useContext } from "react";

import { GlobalContext } from "../../GlobalContext";
import type { Language } from "../types";
import en from "../../assets/translations/en.json";
import vi from "../../assets/translations/vi.json";

function useTranslation(): {
  t: (keys: string) => string;
  setLanguage: (lang: Language) => void;
} {
  const [{ language }, updateContext] = useContext(GlobalContext);

  function t(keys: string): string {
    let translated: any = language === "en" ? en : vi;
    try {
      keys.split(".").forEach((key) => {
        translated = translated[key];
      });
    } catch {
      return keys;
    }
    return typeof translated === "string" ? translated : keys;
  }

  function setLanguage(lang: Language): void {
    updateContext({ language: lang });
  }

  return { t, setLanguage };
}

export default useTranslation;
