import React, { PropsWithChildren } from "react";
import type { MouseEventHandler } from "react";

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
  onClick?: MouseEventHandler;
}

interface BasicJSXPropWithChildren extends BasicJSXProp {
  children: React.ReactNode;
}

export type {
  Nullable,
  Optional,
  IDBResultEvent,
  Language,
  BasicJSXProp,
  BasicJSXPropWithChildren,
};
