import { Optional, WithRequired } from "../../utils/types";
import AbstractModel from "./AbstractModel";
import type { NonFunctionProperties } from "../../utils/types";

type TransactionConstructorArgument = WithRequired<
  NonFunctionProperties<Category>,
  "title" | "icon"
>;

class Category extends AbstractModel {
  public static readonly INDICES_PREFERENCE_ORDER = [];

  public title: string;
  public icon: string;
  public parentTitle: Optional<string> = undefined;

  constructor(data: TransactionConstructorArgument) {
    super();
    this.title = data.title;
    this.icon = data.icon;
    this.parentTitle = data.parentTitle;
  }

  public getKey(): string {
    return this.title;
  }
}

export default Category;
