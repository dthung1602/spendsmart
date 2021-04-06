type Nullable<T> = T | null;
type Optional<T> = T | undefined | null;

type IDBResultEvent<T> = Event & {
  target: {
    result: T;
  };
};

type Language = "en" | "vi";

interface BasicJSXProp {
  className?: string;
  style?: { [key: string]: string | number };
}

export type { Nullable, Optional, IDBResultEvent, Language, BasicJSXProp };
