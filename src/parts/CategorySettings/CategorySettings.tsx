import React, { useContext, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategoryRow from "./CategoryRow";
import CategoryModal from "./CategoryModal";
import { Affix } from "../../components";
import { useTranslation } from "../../utils/hooks";
import { Category } from "../../database";
import { GlobalContext } from "../../GlobalContext";
import "./CategorySettings.less";

function CategorySettings(): JSX.Element {
  const [openedCategory, setOpenedCategory] = useState<Category | undefined>();
  const { overlayOpen, setOverlayOpen, allCategories } = useContext(
    GlobalContext
  );
  const { t } = useTranslation();

  const openModal = (cat?: Category): void => {
    setOverlayOpen(true);
    cat =
      cat ||
      new Category({
        title: "",
        icon: "",
      });
    setOpenedCategory(cat);
  };

  const closeModal = () => {
    setOverlayOpen(false);
    setOpenedCategory(undefined);
  };

  return (
    <>
      <Affix
        offsetTop={0}
        type="primary"
        className="padding-wide v-margin-wide"
      >
        <span className="sub-title">
          {t("parts.category-settings.category")}
        </span>
      </Affix>
      <div className="setting-row h-padding-huge">
        <div />
        <div className="btn-success rounded" onClick={() => openModal()}>
          {t("parts.category-settings.add")} &nbsp;
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className="v-padding-wide">
        {allCategories.map((cat) => (
          <CategoryRow
            category={cat}
            key={cat.title}
            onClick={() => openModal(cat)}
          />
        ))}
      </div>
      <CategoryModal
        open={overlayOpen}
        category={openedCategory}
        onClose={closeModal}
      />
    </>
  );
}

export default CategorySettings;
