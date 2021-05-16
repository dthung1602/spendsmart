import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { icons } from "../../../utils";
import { Category } from "../../../database";
import "./CategoryRow.less";

type CategoryIconName = keyof typeof icons;

interface CategoryRowProps {
  category: Category;
}

function CategoryRow({ category }: CategoryRowProps): JSX.Element {
  const icon = icons[category.icon as CategoryIconName];

  return (
    <div
      className={`category-row v-padding-wide h-padding-huge
      ${category.parentTitle ? "l-margin-huge" : ""} 
    `}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{category.title}</span>
    </div>
  );
}

export default CategoryRow;
