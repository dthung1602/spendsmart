import React, { useContext, useEffect, useRef, useState } from "react";

import { Modal } from "../../../components";
import { useTranslation } from "../../../utils/hooks";
import { Category } from "../../../database";
import { GlobalContext } from "../../../GlobalContext";
import { Optional } from "../../../utils/types";
import "./CategoryModal.less";

interface CategoryModalProps {
  open: boolean;
  category?: Category;
  onClose: () => void;
}

function CategoryModal({
  open,
  category,
  onClose,
}: CategoryModalProps): JSX.Element {
  const { t } = useTranslation();
  const { allCategories } = useContext(GlobalContext);
  const action = category?.isNew ? "create" : "update";

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>(category?.title || "");
  const [icon, setIcon] = useState<string>(category?.icon || "");
  const [parentTitle, setParentTitle] = useState<Optional<string>>(
    category?.parentTitle
  );

  useEffect(() => {
    setTitle(category?.title || "");
    setParentTitle(category?.parentTitle);
    setIcon(category?.icon || "");
  }, [category]);

  return (
    <Modal
      title={t("parts.category-modal.title." + action)}
      open={open}
      onClose={onClose}
    >
      <div className="input-modal">
        <label>{t("parts.category-modal.title-label")}</label>
        <input
          ref={titleInputRef}
          className="background"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>{t("parts.category-modal.parent-title")}</label>
        <input
          className="background"
          value={"" + parentTitle}
          onChange={(event) => setParentTitle(event.target.value)}
        />
        <label>{t("parts.category-modal.icon")}</label>
        <input
          className="background"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
        />
      </div>
    </Modal>
  );
}

export default CategoryModal;
