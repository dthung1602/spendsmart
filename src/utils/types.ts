import React from "react";
import type { MouseEventHandler } from "react";

type Nullable<T> = T | null;
type Optional<T> = T | undefined | null;

// Reference: https://github.com/Microsoft/TypeScript/issues/25760
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type WithRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;

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
  Omit,
  WithOptional,
  WithRequired,
  IDBResultEvent,
  Language,
  BasicJSXProp,
  BasicJSXPropWithChildren,
};
