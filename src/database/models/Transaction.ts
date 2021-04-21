import { Optional } from "../../utils/types";
import Category from "./Category";
import AbstractModel from "./AbstractModel";
import { stemString } from "../../utils";
import type { WithRequired } from "../../utils/types";

type TransactionConstructorArgument = WithRequired<
  Transaction,
  "price" | "categories" | "isUnexpected" | "note"
>;

class Transaction extends AbstractModel {
  public readonly id: number;

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
    super();
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

  public preSave(): void {
    super.preSave();
    this.noteWords = stemString(this.note);
  }
}

export default Transaction;
