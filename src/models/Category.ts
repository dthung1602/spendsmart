import {Optional} from "../types";

class Category {
    constructor(
        public title: string,
        public parentTitle: Optional<string>
    ) {}
}

export default Category;
