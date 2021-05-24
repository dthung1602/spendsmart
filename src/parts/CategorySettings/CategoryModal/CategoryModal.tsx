import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Modal,
  VerticalScrollSelect,
  HorizontalScrollSelect,
} from "../../../components";
import { useTranslation } from "../../../utils/hooks";
import { Category } from "../../../database";
import { GlobalContext } from "../../../GlobalContext";
import { icons } from "../../../utils";
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
  const { categoryOptions } = useContext(GlobalContext);
  const action = category?.isNew ? "create" : "update";

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>(category?.title || "");
  const [icon, setIcon] = useState<string>(category?.icon || "");
  const [parentTitle, setParentTitle] = useState<string | undefined>(
    category?.parentTitle
  );

  const iconOptions = Object.entries(icons).map(([iconName, icon]) => ({
    value: iconName,
    icon: icon,
  }));

  const categoryOptionsWithEmpty = [
    {
      icon: icons.faBan,
      displayText: t("common.none"),
      nested: false,
      value: undefined,
    },
    ...categoryOptions.filter((opt) => opt.value !== title),
  ];

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
        <VerticalScrollSelect
          options={categoryOptionsWithEmpty}
          onSelect={setParentTitle}
          value={parentTitle}
        />
        <label>{t("parts.category-modal.icon")}</label>
        <HorizontalScrollSelect
          options={iconOptions}
          value={icon}
          onSelect={setIcon}
        />
      </div>
    </Modal>
  );
}

export default CategoryModal;
