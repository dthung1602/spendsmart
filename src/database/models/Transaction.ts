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
    categoriesParentIds: Category["parentId"][];
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

  public readonly createdAt: Date;

  public price: number;
  public spendDatetime: Date;
  public isUnexpected: boolean;
  public note: string;
  private $text: string[];

  private _categories: Category[] = [];
  public categoriesTitles: Category["title"][] = [];
  public categoriesParentIds: Category["parentId"][] = [];
  public categoriesIcons: Category["icon"][] = [];

  public get categories(): Category[] {
    return this._categories;
  }

  public set categories(categories: Category[]) {
    this._categories = categories;
    this.categoriesTitles = this.categories.map((cat) => cat.title);
    this.categoriesParentIds = this.categories.map((cat) => cat.parentId);
    this.categoriesIcons = this.categories.map((cat) => cat.icon);
  }

  constructor(data: TransactionConstructorArgument) {
    super(data.id);
    console.log(data);
    const now = new Date();

    this.createdAt = data.createdAt || now;

    this.price = data.price;
    this.spendDatetime = data.spendDatetime || now;
    this.isUnexpected = data.isUnexpected;
    this.note = data.note;
    this.$text = stemString(this.note);

    if (data.categories) {
      this.categories = data.categories;
    } else {
      console.log({
        t: data.categoriesTitles,
        p: data.categoriesParentIds,
        i: data.categoriesIcons,
      });
      this.categories = data.categoriesTitles.map(
        (title, i) =>
          new Category({
            title,
            parentId: data.categoriesParentIds[i],
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
