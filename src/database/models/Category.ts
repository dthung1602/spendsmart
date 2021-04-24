import { Optional } from "../../utils/types";
import AbstractModel from "./AbstractModel";

class Category extends AbstractModel {
  public title: string;
  public icon: string;
  public parentTitle: Optional<string> = undefined;

  constructor(data: Category) {
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
