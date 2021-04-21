import { Optional } from "../../utils/types";
import Category from "./Category";
import { stemString } from "../../utils";
import type { WithOptional } from "../../utils/types";

type TransactionConstructorArgument = WithOptional<
  Transaction,
  "id" | "spendDatetime" | "createdAt" | "updatedAt" | "deletedAt"
>;

class Transaction {
  public id: number;

  public price: number;
  public categories: Category[];
  public spendDatetime: Date;
  public isUnexpected: boolean;
  public note: string;
  private noteWords: string[];

  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Optional<Date>;

  constructor(data: TransactionConstructorArgument) {
    const now = new Date();

    this.id = data.id || now.getTime();

    this.price = data.price;
    this.categories = data.categories;
    this.spendDatetime = data.spendDatetime || now;
    this.isUnexpected = data.isUnexpected;
    this.note = data.note;
    this.noteWords = stemString(this.note);

    this.createdAt = data.createdAt || now;
    this.updatedAt = data.updatedAt || now;
    this.deletedAt = data.deletedAt;
  }
}

export default Transaction;
