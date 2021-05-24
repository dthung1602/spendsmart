import React from "react";
import type { MouseEventHandler } from "react";
import CSS from "csstype";

type Nullable<T> = T | null;
type Optional<T> = T | undefined | null;

// Reference: https://github.com/Microsoft/TypeScript/issues/25760
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WithRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;

type IDBResultEvent<T> = Event & {
  target: {
    result: T;
  };
};

type Language = "en" | "vi";

interface BasicJSXProp {
  className?: string;
  style?: CSS.Properties;
  onClick?: MouseEventHandler;
  id?: string;
}

interface BasicJSXPropWithChildren extends BasicJSXProp {
  children: React.ReactNode;
}

// ref: https://stackoverflow.com/a/55479659/7342188
type NonFunctionProperties<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends CallableFunction ? never : K;
  }[keyof T]
>;

type Class<T> = new (...args: any[]) => T;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = T | U extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type Impossible<K extends keyof any> = {
  [P in K]: never;
};

type NoExtra<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type FlattenIfArray<T> = T extends (infer R)[] ? R : T;

type NonFunctionObject<T> = {
  [K in keyof T]: T[K] extends CallableFunction
    ? never
    : K extends string
    ? K
    : never;
};

type NonFunctionKeys<T> = NonFunctionObject<T>[keyof NonFunctionObject<T>];

// https://dev.to/phenomnominal/i-need-to-learn-about-typescript-template-literal-types-51po

// Ref https://stackoverflow.com/a/58436959/7342188
// For simplicity, only 2 levels are supported
// Otherwise ts will throw error
type Leaves<T> = {
  [K in keyof T]: FlattenIfArray<T[K]> extends CallableFunction
    ? never
    : FlattenIfArray<T[K]> extends Record<string, unknown>
    ? Join<K, NonFunctionKeys<FlattenIfArray<T[K]>>>
    : K extends string
    ? K
    : never;
}[keyof T];

type BasicType = string | number | boolean | Date;

type Path<T, K extends keyof T = keyof T> = K extends string
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    FlattenIfArray<T[K]> extends Function
    ? never
    : FlattenIfArray<T[K]> extends BasicType
    ? K
    : FlattenIfArray<T[K]> extends Record<string, any>
    ?
        | `${K}.${Path<
            FlattenIfArray<T[K]>,
            NonFunctionKeys<FlattenIfArray<T[K]>>
          > &
            string}`
        | `${K}.${NonFunctionKeys<FlattenIfArray<T[K]>> & string}`
    : never
  : never;

type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<FlattenIfArray<T[K]>>
      ? PathValue<FlattenIfArray<T[K]>, Rest>
      : never
    : never
  : P extends keyof T
  ? FlattenIfArray<T[P]>
  : never;

export type {
  Nullable,
  Optional,
  Omit,
  WithRequired,
  NonFunctionKeys,
  NonFunctionProperties,
  Class,
  Impossible,
  NoExtra,
  XOR,
  Join,
  FlattenIfArray,
  Leaves,
  Path,
  PathValue,
  IDBResultEvent,
  Language,
  BasicJSXProp,
  BasicJSXPropWithChildren,
};
