import React from "react";

type Nullable<T> = T | null;
type Optional<T> = T | undefined | null;

type IDBResultEvent<T> = Event & {
  target: {
    result: T;
  };
};

export type { Nullable, Optional, IDBResultEvent };
