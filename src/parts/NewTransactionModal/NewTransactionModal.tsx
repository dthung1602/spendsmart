import React, { useContext, useEffect, useRef, useState } from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  Modal,
  ModalButton,
  notify,
  Switch,
  VerticalScrollSelect,
} from "../../components";
import { publish } from "../../pubsub";
import { useTranslation } from "../../utils/hooks";
import { GlobalContext } from "../../GlobalContext";
import { Category, Transaction, transactionDataStore } from "../../database";
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
  const { allCategories, categoryOptions } = useContext(GlobalContext);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const [expand, setExpand] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [spendDatetime, setSpendDatetime] = useState<string>("");
  const [isUnexpected, setIsUnexpected] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (open) {
      priceInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setCategory(allCategories[0].title);
  }, [allCategories]);

  const clearAllInputs = () => {
    setPrice(0);
    setCategory("");
    setExpand(false);
    setSpendDatetime("");
    setIsUnexpected(false);
    setNote("");
  };

  const close = () => {
    clearAllInputs();
    onClose();
  };

  const add = () => {
    const leafCategory = allCategories.find(
      (cat) => cat.title === category
    ) as Category;
    const parentCategory = allCategories.find(
      (cat) => cat.title === leafCategory.parentTitle
    );
    const categories = [leafCategory];
    if (parentCategory) {
      categories.push(parentCategory);
    }

    const data = {
      categories,
      isUnexpected,
      spendDatetime: spendDatetime ? new Date(spendDatetime) : undefined,
      note,
      price,
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
      <div className="transaction-modal input-modal">
        <label>{t("common.price")}</label>
        <input
          type="number"
          className="background"
          ref={priceInputRef}
          value={price}
          onChange={(event) => {
            const newPrice = parseFloat(event.target.value);
            if (!isNaN(newPrice) || event.target.value === "") {
              setPrice(newPrice);
            }
          }}
        />
        <label>{t("common.category")}</label>
        <VerticalScrollSelect
          className="cat-input"
          value={category}
          onSelect={(value) => setCategory(value)}
          options={categoryOptions}
        />
      </div>

      <Accordion expand={expand}>
        <div className="transaction-modal input-modal">
          <label>{t("common.unexpected-spending")}</label>
          <Switch
            checked={isUnexpected}
            onClick={() => setIsUnexpected(!isUnexpected)}
            style={{ justifySelf: "end" }}
          />
          <label>{t("common.datetime")}</label>
          <input
            className="background"
            type="datetime-local"
            value={spendDatetime}
            onChange={(event) => setSpendDatetime(event.target.value)}
          />
          <label>{t("common.note")}</label>
          <textarea
            className="background"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
      </Accordion>
    </Modal>
  );
}

export default NewTransactionModal;
export type { NewTransactionModalProps };
