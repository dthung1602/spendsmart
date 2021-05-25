import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Modal,
  VerticalScrollSelect,
  HorizontalScrollSelect,
  ModalButton,
  notify,
} from "../../../components";
import { useTranslation } from "../../../utils/hooks";
import { Category, categoryDataStore } from "../../../database";
import { GlobalContext } from "../../../GlobalContext";
import { icons } from "../../../utils";
import "./CategoryModal.less";

interface CategoryModalProps {
  open: boolean;
  category: Category;
  onClose: () => void;
}

function CategoryModal({
  open,
  category,
  onClose,
}: CategoryModalProps): JSX.Element {
  const { t } = useTranslation();
  const { categoryOptions, reloadCategories } = useContext(GlobalContext);
  const action = category.isNew ? "create" : "update";

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>(category.title || "");
  const [icon, setIcon] = useState<string>(category.icon || "");
  const [parentId, setParentId] = useState<number | undefined>(
    category.parentId
  );

  const iconOptions = Object.entries(icons).map(([iconName, icon]) => ({
    value: iconName,
    icon: icon,
  }));

  const parentCategoryOptions = [
    {
      icon: icons.faBan,
      displayText: t("common.none"),
      nested: false,
      value: undefined,
    },
    ...categoryOptions.filter(
      // cant be parent of self; only nest 1 level
      (opt) => opt.value !== category.id && !opt.nested
    ),
  ];

  const close = () => {
    reloadCategories();
    notify(t(`parts.category-modal.notify-${action}`), "success");
    onClose();
  };

  const buttons: ModalButton[] = [
    {
      displayText: t(`common.${action}`),
      type: action === "update" ? "warning" : "success",
      onClick: () => {
        const cat = new Category({
          ...(category ? category : {}),
          title,
          icon,
          parentId,
        });
        categoryDataStore[action](cat)
          .then(close)
          .catch((e) => {
            console.log(e);
            notify(String(e), "error");
          });
      },
    },
  ];

  useEffect(() => {
    setTitle(category.title || "");
    setParentId(category.parentId);
    setIcon(category.icon || "");
  }, [category]);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, [open]);

  return (
    <Modal
      title={t("parts.category-modal.title." + action)}
      open={open}
      onClose={onClose}
      buttons={buttons}
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
          options={parentCategoryOptions}
          onSelect={setParentId}
          value={parentId}
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
