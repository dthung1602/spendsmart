import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BasicJSXProp } from "../../../utils/types";
import { iconMapping } from "../../../utils";
import { Category } from "../../../database";
import "./CategoryRow.less";

type CategoryIconName = keyof typeof iconMapping;

interface CategoryRowProps extends BasicJSXProp {
  category: Category;
}

function CategoryRow({
  category,
  onClick,
  className,
  style,
}: CategoryRowProps): JSX.Element {
  const icon = iconMapping[category.icon as CategoryIconName];

  return (
    <div
      className={`category-row v-padding-wide h-padding-huge ${className}
        ${category.parentId ? "l-margin-huge" : ""}`}
      style={style}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{category.title}</span>
    </div>
  );
}

export default CategoryRow;
