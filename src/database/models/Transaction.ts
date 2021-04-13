import { Optional } from "../../utils/types";

class Transaction {
  constructor(
    public id: number = new Date().getTime(),
    public spendDatetime: Date = new Date(),
    public title: string,
    private titleWords: string[],
    public categories: string[],
    public leafCategory: string,
    public icon: string,
    public price: number,
    public isUnexpected: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Optional<Date> = undefined
  ) {}
}

export default Transaction;
