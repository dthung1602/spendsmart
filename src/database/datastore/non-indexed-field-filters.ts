import type { NonFunctionKeys } from "../../utils/types";
import type { FilterObject } from "./type";

class NonIndexedFieldFilters<Model> {
  private readonly filter: FilterObject<Model>;
  private limit: number;
  private skip: number;

  constructor(filter: FilterObject<Model>) {
    this.filter = filter;
    this.limit = filter.$limit || Number.MAX_SAFE_INTEGER;
    this.skip = filter.$skip || 0;
  }

  public match(object: Model): boolean {
    let match = true;
    for (const entry of Object.entries(this.filter)) {
      const field = entry[0] as NonFunctionKeys<Model>;
      const query = entry[1] as any;

      if (query.hasOwnProperty("$eq")) {
        if (object[field] === query["$eq"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$lte")) {
        if (object[field] > query["$lte"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$lt")) {
        if (object[field] >= query["$lt"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$gte")) {
        if (object[field] < query["$gte"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$gt")) {
        if (object[field] <= query["$gt"]) {
          match = false;
          break;
        }
      }
    }
    if (match) {
      if (this.skip > 0) {
        this.skip--;
        match = false;
      } else if (this.limit > 0) {
        this.limit--;
      }
    }
    return match;
  }

  public shouldContinue(): boolean {
    return this.limit > 0;
  }
}

export default NonIndexedFieldFilters;
