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

// ref: https://stackoverflow.com/a/55479659/7342188
type NonFunctionProperties<T> = Pick<
  T,
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

type Class<T> = new (...args: any[]) => T;

export type {
  Nullable,
  Optional,
  Omit,
  WithOptional,
  WithRequired,
  NonFunctionProperties,
  Class,
  IDBResultEvent,
  Language,
  BasicJSXProp,
  BasicJSXPropWithChildren,
};
