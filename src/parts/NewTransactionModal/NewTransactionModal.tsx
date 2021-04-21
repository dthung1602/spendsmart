import React, { useEffect, useRef, useState } from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  Modal,
  ModalButton,
  Switch,
  VerticalScrollSelect,
  VerticalScrollSelectOptionValue,
} from "../../components";
import { useTranslation } from "../../utils/hooks";
import { categoriesToSelectOptions } from "../../utils";
import { categoryDataStore } from "../../database";
import "./NewTransactionModal.less";

interface NewTransactionModalProps {
  open: boolean;
  onClose: () => void;
}

function NewTransactionModal({
  open,
  onClose,
}: NewTransactionModalProps): JSX.Element {
  const { t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<
    VerticalScrollSelectOptionValue<string>[]
  >([]);

  const [category, setCategory] = useState<string>("");
  const [isUnexpected, setIsUnexpected] = useState<boolean>(false);

  const amountInputRef = useRef<HTMLInputElement>(null);
  const spendDateInputRef = useRef<HTMLInputElement>(null);
  const noteTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      amountInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    categoryDataStore.findAll().then((cats) => {
      const options = categoriesToSelectOptions(cats);
      setCategoryOptions(options);
      setCategory(options[0].value);
    });
  }, []);

  const close = () => {
    // clear input before close
    setExpand(false);
    setIsUnexpected(false);
    [amountInputRef, spendDateInputRef, noteTextAreaRef].forEach((r) => {
      if (r.current) r.current.value = "";
    });
    onClose();
  };

  const add = () => {
    const data = {
      category,
      isUnexpected,
    };
  };

  const buttons: ModalButton[] = [
    {
      type: "info",
      displayText: expand ? t("common.less") : t("common.more"),
      icon: expand ? faAngleDoubleDown : faAngleDoubleUp,
      onClick: () => setExpand(!expand),
    },
    {
      type: "success",
      displayText: t("common.add"),
      icon: faPlus,
      onClick: add,
    },
  ];

  return (
    <Modal
      title={t("parts.new-transaction-modal.title")}
      open={open}
      onClose={close}
      buttons={buttons}
    >
      <div className="new-transaction">
        <label>{t("common.price")}</label>
        <input type="number" ref={amountInputRef} />
        <label>{t("common.category")}</label>
        <VerticalScrollSelect
          className="cat-input"
          onSelect={(value) => setCategory(value)}
          options={categoryOptions}
        />
      </div>

      <Accordion expand={expand}>
        <div className="new-transaction new-transaction-extra">
          <label>{t("common.unexpected-spending")}</label>
          <Switch
            checked={isUnexpected}
            onClick={() => setIsUnexpected(!isUnexpected)}
            style={{ justifySelf: "end" }}
          />
          <label>{t("common.datetime")}</label>
          <input type="datetime-local" ref={spendDateInputRef} />
          <label>{t("common.note")}</label>
          <textarea ref={noteTextAreaRef} />
        </div>
      </Accordion>
    </Modal>
  );
}

export default NewTransactionModal;
export type { NewTransactionModalProps };
