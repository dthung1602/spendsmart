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
  notify,
} from "../../components";
import { publish } from "../../pubsub";
import { useTranslation } from "../../utils/hooks";
import { categoriesToSelectOptions } from "../../utils";
import {
  Category,
  Transaction,
  categoryDataStore,
  transactionDataStore,
} from "../../database";
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
  const categoriesRef = useRef<Category[]>([]);
  const [catOptions, setCatOptions] = useState<
    VerticalScrollSelectOptionValue<string>[]
  >([]);

  const [category, setCategory] = useState<string>("");
  const [isUnexpected, setIsUnexpected] = useState<boolean>(false);

  const priceInputRef = useRef<HTMLInputElement>(null);
  const spendDateInputRef = useRef<HTMLInputElement>(null);
  const noteTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      priceInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    categoryDataStore.findAll().then((cats) => {
      const options = categoriesToSelectOptions(cats);
      setCatOptions(options);
      setCategory(options[0].value);
      categoriesRef.current = cats;
    });
  }, []);

  const clearAllInputs = () => {
    setExpand(false);
    setIsUnexpected(false);
    [priceInputRef, spendDateInputRef, noteTextAreaRef].forEach((r) => {
      if (r.current) r.current.value = "";
    });
  };

  const close = () => {
    clearAllInputs();
    onClose();
  };

  const add = () => {
    const leafCategory = categoriesRef.current.find(
      (cat) => cat.title === category
    ) as Category;
    const parentCategory = categoriesRef.current.find(
      (cat) => cat.title === leafCategory.parentTitle
    );
    const categories = [leafCategory];
    if (parentCategory) {
      categories.push(parentCategory);
    }
    const spendDatetimeStr = spendDateInputRef.current?.value;
    const data = {
      categories,
      isUnexpected,
      spendDatetime: spendDatetimeStr ? new Date(spendDatetimeStr) : undefined,
      note: noteTextAreaRef.current?.value as string,
      price: parseFloat(priceInputRef.current?.value as string),
    };
    const transaction = new Transaction(data);
    transactionDataStore
      .create(transaction)
      .then(() => {
        close();
        notify(t("parts.new-transaction-modal.added"), "success");
        publish("transaction-added", transaction);
      })
      .catch((e) => notify(String(e), "error"));
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
        <input type="number" className="background" ref={priceInputRef} />
        <label>{t("common.category")}</label>
        <VerticalScrollSelect
          className="cat-input"
          onSelect={(value) => setCategory(value)}
          options={catOptions}
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
