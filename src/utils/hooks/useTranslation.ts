import { useContext } from "react";

import { GlobalContext } from "../../GlobalContext";
import type { Language } from "../types";
import en from "../../assets/translations/en.json";
import vi from "../../assets/translations/vi.json";

function useTranslation(): {
  t: (keys: string) => string;
  language: "en" | "vi";
  setLanguage: (lang: Language) => void;
} {
  const { language, setLanguage } = useContext(GlobalContext);

  function t(keys: string): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return { t, language, setLanguage };
}

export default useTranslation;
