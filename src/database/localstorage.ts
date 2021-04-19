import { Language } from "../utils/types";

class LocalStorage {
  public static get lastMigratedVersion(): number {
    return LocalStorage.getInt("dbLastMigratedVersion", 0);
  }

  public static set lastMigratedVersion(value: number) {
    window.localStorage.setItem("lastMigratedVersion", value.toString());
  }

  public static get language(): Language {
    return LocalStorage.getString("language", "en") as Language;
  }

  public static set language(value: Language) {
    window.localStorage.setItem("language", value);
  }

  public static get introTourTaken(): boolean {
    return Boolean(
      JSON.parse(LocalStorage.getString("introTourTaken", "false"))
    );
  }

  public static set introTourTaken(value: boolean) {
    window.localStorage.setItem("introTourTaken", value.toString());
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

export default LocalStorage;
