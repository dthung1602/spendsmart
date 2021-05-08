import Category from "./Category";
import AbstractModel from "./AbstractModel";
import { stemString } from "../../utils";
import type { WithRequired, NonFunctionProperties } from "../../utils/types";

type TransactionConstructorArgument = WithRequired<
  NonFunctionProperties<Transaction>,
  "price" | "categories" | "isUnexpected" | "note"
>;

class Transaction extends AbstractModel {
  public static readonly SPEND_DATETIME_INDEX = "spend-datetime-index";
  public static readonly CATEGORY_INDEX = "category-index";
  public static readonly TEXT_INDEX = "text-index";

  public static readonly INDICES_PREFERENCE_ORDER = [
    {
      field: "$text",
      index: Transaction.TEXT_INDEX,
    },
    {
      field: "spendDatetime",
      index: Transaction.SPEND_DATETIME_INDEX,
    },
    {
      field: "categories.title",
      index: Transaction.CATEGORY_INDEX,
    },
  ];

  public readonly id: number;
  public readonly createdAt: Date;

  public price: number;
  public categories: Category[];
  public spendDatetime: Date;
  public isUnexpected: boolean;
  public note: string;
  private $text: string[];

  constructor(data: TransactionConstructorArgument) {
    super();
    const now = new Date();

    this.id = data.id || now.getTime();
    this.createdAt = data.createdAt || now;

    this.price = data.price;
    this.categories = data.categories;
    this.spendDatetime = data.spendDatetime || now;
    this.isUnexpected = data.isUnexpected;
    this.note = data.note;
    this.$text = stemString(this.note);
  }

  public preSave(): void {
    super.preSave();
    this.$text = stemString(this.note);
  }

  public getKey(): number {
    return this.id;
  }
}

export default Transaction;
