import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Button,
  HorizontalScrollSelect,
  Modal,
  notify,
  VerticalScrollSelect,
} from "../../../components";
import { useTranslation } from "../../../utils/hooks";
import { Category, categoryDataStore } from "../../../database";
import { GlobalContext } from "../../../GlobalContext";
import { iconMapping } from "../../../utils";
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
  const { categoryOptions, reloadCategories, allCategories } = useContext(
    GlobalContext
  );
  const action = category.isNew ? "create" : "update";

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>(category.title || "");
  const [icon, setIcon] = useState<string>(category.icon || "");
  const [parentId, setParentId] = useState<number | undefined>(
    category.parentId
  );

  const iconOptions = Object.entries(iconMapping).map(([iconName, icon]) => ({
    value: iconName,
    icon: icon,
  }));

  const parentCategoryOptions = [
    {
      icon: iconMapping.faBan,
      displayText: t("common.none"),
      nested: false,
      value: undefined,
    },
    ...categoryOptions.filter(
      // cant be parent of self; only nest 1 level
      (opt) => opt.value !== category.id && !opt.nested
    ),
  ];

  const close = (message: string) => {
    reloadCategories();
    notify(t(`parts.category-modal.notify-${message}`), "success");
    onClose();
  };

  const footer = [
    <Button
      key="primary-btn"
      theme={action === "update" ? "warning" : "success"}
      size="large"
      onClick={() => {
        const cat = new Category({
          ...(category ? category : {}),
          title,
          icon,
          parentId,
        });
        categoryDataStore[action](cat)
          .then(() => {
            close(action);
          })
          .catch((e) => {
            console.log(e);
            notify(String(e), "error");
          });
      }}
    >
      {t(`common.${action}`)}
    </Button>,
  ];

  const categoryHasChildren = Boolean(
    allCategories.find((cat) => cat.parentId === category.id)
  );

  if (action === "update" && !categoryHasChildren) {
    footer.splice(
      0,
      0,
      <Button
        theme="error"
        size="large"
        onClick={() => {
          categoryDataStore
            .delete(category)
            .then(() => {
              close("delete");
            })
            .catch((e) => {
              console.log(e);
              notify(String(e), "error");
            });
        }}
      >
        {t("common.delete")}
      </Button>
    );
  }

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
      footer={footer}
    >
      <div className="input-modal">
        <label>{t("parts.category-modal.title-label")}</label>
        <input
          ref={titleInputRef}
          className="light"
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
