type Nullable<T> = T | null;
type Optional<T> = T | undefined | null;

type IDBResultEvent<T> = Event & {
  target: {
    result: T;
  };
};

type Language = "en" | "vi";

export type { Nullable, Optional, IDBResultEvent, Language };
