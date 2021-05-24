import type { NonFunctionProperties } from "../../utils/types";
import { WithRequired } from "../../utils/types";
import AbstractModel from "./AbstractModel";

type TransactionConstructorArgument = WithRequired<
  NonFunctionProperties<Category>,
  "title" | "icon"
>;

class Category extends AbstractModel {
  public static readonly INDICES_PREFERENCE_ORDER = [];

  public title: string;
  public icon: string;
  public parentTitle: string | undefined = undefined;

  constructor(data: TransactionConstructorArgument) {
    super(!data.title);
    this.title = data.title;
    this.icon = data.icon;
    this.parentTitle = data.parentTitle;
  }

  public getKey(): string {
    return this.title;
  }
}

export default Category;
