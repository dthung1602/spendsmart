import { Class, NoExtra, Path, PathValue, XOR } from "../../utils/types";

interface IndexPreference<Model> {
  readonly INDICES_PREFERENCE_ORDER: {
    field: Path<Model> | "$text";
    index: string;
  }[];
}

type ModelClass<Model> = Class<Model> & IndexPreference<Model>;

type SelectedIndex = {
  field: string;
  index: string;
  query: any;
};

type EqualQuery<T> = NoExtra<{ $eq: T }>;
type LessThanQuery<T> = XOR<{ $lte: T }, { $lt: T }>;
type GreaterThanQuery<T> = XOR<{ $gte: T }, { $gt: T }>;
type RangeQuery<T> = LessThanQuery<T> & GreaterThanQuery<T>;

type Query<T> = XOR<
  EqualQuery<T>,
  XOR<XOR<GreaterThanQuery<T>, LessThanQuery<T>>, RangeQuery<T>>
>;

type TextQuery = { $text?: string };

type Pagination = {
  $limit?: number;
  $skip?: number;
};

type ComparableQuery<Model> = {
  [K in Path<Model>]?: Query<PathValue<Model, K>>;
};

type FilterObject<Model> = ComparableQuery<Model> & TextQuery & Pagination;

export type {
  FilterObject,
  ComparableQuery,
  SelectedIndex,
  ModelClass,
  Pagination,
};
