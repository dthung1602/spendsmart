import { Language } from "../utils/types";

type CurrencyPlacement = "before" | "after";

class Localstorage {
  public static get lastMigratedVersion(): number {
    return Localstorage.getInt("dbLastMigratedVersion", 0);
  }

  public static set lastMigratedVersion(value: number) {
    window.localStorage.setItem("lastMigratedVersion", value.toString());
  }

  public static get language(): Language {
    return Localstorage.getString("language", "en") as Language;
  }

  public static set language(value: Language) {
    window.localStorage.setItem("language", value);
  }

  public static get introTourTaken(): boolean {
    return Boolean(
      JSON.parse(Localstorage.getString("introTourTaken", "false"))
    );
  }

  public static set introTourTaken(value: boolean) {
    window.localStorage.setItem("introTourTaken", value.toString());
  }

  public static get currencySymbol(): string {
    return Localstorage.getString("currencySymbol", "$");
  }

  public static set currencySymbol(value: string) {
    window.localStorage.setItem("currencySymbol", value);
  }

  public static get currencyPlacement(): CurrencyPlacement {
    return Localstorage.getString(
      "currencyPlacement",
      "before"
    ) as CurrencyPlacement;
  }

  public static set currencyPlacement(value: CurrencyPlacement) {
    window.localStorage.setItem("currencyPlacement", value);
  }

  private static getInt(key: string, fallback = 0): number {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : parseInt(value);
  }

  private static getString(key: string, fallback = ""): string {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  }
}

export default Localstorage;
