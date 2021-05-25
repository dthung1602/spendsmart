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
  public parentId: number | undefined = undefined;

  constructor(data: TransactionConstructorArgument) {
    super(data.id);

    this.title = data.title;
    this.icon = data.icon;
    this.parentId = data.parentId;
  }
}

export default Category;
