import React, { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoryRow from "./CategoryRow";
import { Affix, notify } from "../../components";
import { useTranslation } from "../../utils/hooks";
import { sortCategory } from "../../utils";
import { Category, categoryDataStore } from "../../database";
import "./CategorySettings.less";

function CategorySettings(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    categoryDataStore
      .findAll()
      .then((cats) => {
        setCategories(sortCategory(cats));
      })
      .catch((e) => notify(String(e), "error"));
  });

  return (
    <>
      <Affix offsetTop={0} type="primary" className="padding-wide">
        <span className="sub-title">
          {t("parts.category-settings.category")}
        </span>
      </Affix>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div />
        <div className="btn-success rounded">
          {t("parts.category-settings.add")} &nbsp;
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {categories.map((cat) => (
        <CategoryRow category={cat} key={cat.title} />
      ))}
    </>
  );
}

export default CategorySettings;
