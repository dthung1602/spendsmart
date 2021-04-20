import { Optional } from "../../utils/types";

class Category {
  public title: string;
  public icon: string;
  public parentTitle: Optional<string> = undefined;

  constructor(data: Category) {
    this.title = data.title;
    this.icon = data.icon;
    this.parentTitle = data.parentTitle;
  }
}

export default Category;
