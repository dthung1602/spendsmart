import React, { useContext, useState } from "react";

import CategoryRow from "./CategoryRow";
import CategoryModal from "./CategoryModal";
import { Affix, Button } from "../../components";
import { useTranslation } from "../../utils/hooks";
import { Category } from "../../database";
import { GlobalContext } from "../../GlobalContext";
import "./CategorySettings.less";

function CategorySettings(): JSX.Element {
  const [openedCategory, setOpenedCategory] = useState<Category>(
    new Category({
      title: "",
      icon: "faNone",
    })
  );
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
    setOpenedCategory(
      new Category({
        title: "",
        icon: "faNone",
      })
    );
  };

  return (
    <>
      <Affix
        offsetTop={0}
        theme="dark"
        tone="darker"
        className="padding-wide v-margin-wide"
      >
        <span className="sub-title">
          {t("parts.category-settings.category")}
        </span>
      </Affix>
      <div className="setting-row h-padding-huge">
        <div />
        <Button
          theme="success"
          size="medium"
          icon="faPlus"
          onClick={() => openModal()}
        >
          {t("parts.category-settings.add")}
        </Button>
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
