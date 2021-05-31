import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Category } from "../../../database";
import { BasicJSXProp } from "../../../utils/types";
import "./CategoryRow.less";

interface CategoryRowProps extends BasicJSXProp {
  category: Category;
}

function CategoryRow({
  category,
  onClick,
  className,
  style,
}: CategoryRowProps): JSX.Element {
  return (
    <div
      className={`category-row v-padding-wide h-padding-huge ${className}
        ${category.parentId ? "l-margin-huge" : ""}`}
      style={style}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={category.icon} />
      <span>{category.title}</span>
    </div>
  );
}

export default CategoryRow;
