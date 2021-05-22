import {
  EQUAL,
  LESS_THAN,
  MORE_THAN,
  TARGET_STT_WAITING,
  TARGET_STT_ON_TRACK,
  TARGET_STT_WARNING,
  TARGET_STT_FAILED,
  TARGET_STT_COMPLETED,
  TARGET_STT_ABANDONED,
} from "../../utils/constants";
import AbstractModel from "./AbstractModel";

type Compare = typeof LESS_THAN | typeof EQUAL | typeof MORE_THAN;

type Status =
  | typeof TARGET_STT_WAITING
  | typeof TARGET_STT_ON_TRACK
  | typeof TARGET_STT_WARNING
  | typeof TARGET_STT_FAILED
  | typeof TARGET_STT_COMPLETED
  | typeof TARGET_STT_ABANDONED;

class Target extends AbstractModel {
  constructor(
    public id: number,
    public title: string,
    private titleWords: [string],
    public startDate: Date,
    public endDate: Date,
    public categories: [string],
    public includeUnexpected: boolean,
    public compare: Compare,
    public total: number,
    public status: Status,
    public createdAt: Date
  ) {
    super(true);
  }

  public getKey(): number {
    return this.id;
  }
}

export default Target;
