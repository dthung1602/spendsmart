import Category from "./Category";
import AbstractModel from "./AbstractModel";
import { stemString } from "../../utils";
import type {
  WithRequired,
  NonFunctionProperties,
  XOR,
} from "../../utils/types";

type CategoryInit = XOR<
  { categories: Category[] },
  {
    categoriesTitles: Category["title"][];
    categoriesParentTitles: Category["parentTitle"][];
    categoriesIcons: Category["icon"][];
  }
>;

type TransactionConstructorArgument = CategoryInit &
  WithRequired<
    NonFunctionProperties<Transaction>,
    "price" | "isUnexpected" | "note"
  >;

class Transaction extends AbstractModel {
  public static readonly SPEND_DATETIME_INDEX = "spend-datetime-index";
  public static readonly CATEGORY_INDEX = "category-index";
  public static readonly TEXT_INDEX = "text-index";

  public static readonly INDICES_PREFERENCE_ORDER = [
    {
      field: "$text" as const,
      index: Transaction.TEXT_INDEX,
    },
    {
      field: "spendDatetime" as const,
      index: Transaction.SPEND_DATETIME_INDEX,
    },
    {
      field: "categoriesTitles" as const,
      index: Transaction.CATEGORY_INDEX,
    },
  ];

  public readonly id: number;
  public readonly createdAt: Date;

  public price: number;
  public spendDatetime: Date;
  public isUnexpected: boolean;
  public note: string;
  private $text: string[];

  private _categories: Category[] = [];
  public categoriesTitles: Category["title"][] = [];
  public categoriesParentTitles: Category["parentTitle"][] = [];
  public categoriesIcons: Category["icon"][] = [];

  public get categories(): Category[] {
    return this._categories;
  }

  public set categories(categories: Category[]) {
    this._categories = categories;
    this.categoriesTitles = this.categories.map((cat) => cat.title);
    this.categoriesParentTitles = this.categories.map((cat) => cat.parentTitle);
    this.categoriesIcons = this.categories.map((cat) => cat.icon);
  }

  constructor(data: TransactionConstructorArgument) {
    super();
    const now = new Date();

    this.id = data.id || now.getTime();
    this.createdAt = data.createdAt || now;

    this.price = data.price;
    this.spendDatetime = data.spendDatetime || now;
    this.isUnexpected = data.isUnexpected;
    this.note = data.note;
    this.$text = stemString(this.note);

    if (data.categories) {
      this.categories = data.categories;
    } else {
      this.categories = Array.from(Array(8).keys()).map(
        (i) =>
          new Category({
            title: data.categoriesTitles[i],
            parentTitle: data.categoriesParentTitles[i],
            icon: data.categoriesIcons[i],
          })
      );
    }
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
