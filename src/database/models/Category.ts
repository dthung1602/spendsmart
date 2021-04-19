import { Optional } from "../../utils/types";

class Category {
  constructor(
    public title: string,
    public icon: string,
    public parentTitle: Optional<string> = undefined
  ) {}
}

export default Category;
