import { SelectedIndex } from "./type";

/* eslint-disable @typescript-eslint/no-explicit-any */
const keyRangeMapping: Record<string, (query: any) => IDBKeyRange> = {
  $gte: (query: any) => IDBKeyRange.lowerBound(query.$gte),
  $gt: (query: any) => IDBKeyRange.lowerBound(query.$gt, true),
  $lte: (query: any) => IDBKeyRange.upperBound(query.$lte),
  $lt: (query: any) => IDBKeyRange.upperBound(query.$lt, true),
  $gte$lte: (query: any) => IDBKeyRange.bound(query.$gte, query.$lte),
  $gt$lt: (query: any) => IDBKeyRange.bound(query.$gt, query.$lt, true, true),
  $gt$lte: (query: any) =>
    IDBKeyRange.bound(query.$gt, query.$lte, true, false),
  $gte$lt: (query: any) =>
    IDBKeyRange.bound(query.$gte, query.$lt, false, true),
  $eq: (query: any) => IDBKeyRange.only(query.$eq),
  $text: (query: any) => IDBKeyRange.only(query),
  "": (query: any) => IDBKeyRange.only(query.$eq),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function getIndexRange(selectedIndex: SelectedIndex): IDBKeyRange {
  const key =
    selectedIndex.field === "$text"
      ? "$text"
      : Object.keys(selectedIndex.query).sort().join("");
  return keyRangeMapping[key](selectedIndex.query);
}

export default getIndexRange;
