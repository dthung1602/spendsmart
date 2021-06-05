import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Accordion,
  Modal,
  notify,
  Switch,
  VerticalScrollSelect,
  Button,
} from "../../components";
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
  const { allCategories, categoryOptions, emitTransactionChange } = useContext(
    GlobalContext
  );
  const priceInputRef = useRef<HTMLInputElement>(null);

  const [expand, setExpand] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<number>(-1);
  const [spendDatetime, setSpendDatetime] = useState<string>("");
  const [isUnexpected, setIsUnexpected] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (open) {
      priceInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setCategory(allCategories[0]?.id || -1);
  }, [allCategories]);

  const clearAllInputs = () => {
    setPrice("");
    setCategory(-1);
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
      (cat) => cat.id === category
    ) as Category;
    const parentCategory = allCategories.find(
      (cat) => cat.id === leafCategory.parentId
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
      price: parseFloat(price),
    };
    const transaction = new Transaction(data);
    transactionDataStore
      .create(transaction)
      .then(() => {
        close();
        notify(t("parts.new-transaction-modal.added"), "success");
        emitTransactionChange({ type: "create", transaction });
      })
      .catch((e) => notify(String(e), "error"));
  };

  const buttons = [
    <Button
      key="more"
      theme="info"
      size="large"
      icon={expand ? "angle-double-down" : "angle-double-up"}
      onClick={() => setExpand(!expand)}
    >
      {expand ? t("common.less") : t("common.more")}
    </Button>,
    <Button key="add" theme="success" size="large" icon="plus" onClick={add}>
      {t("common.add")}
    </Button>,
  ];

  return (
    <Modal
      title={t("parts.new-transaction-modal.title")}
      open={open}
      onClose={close}
      footer={buttons}
    >
      <div className="transaction-modal input-modal">
        <label>{t("common.price")}</label>
        <input
          type="number"
          className="light"
          ref={priceInputRef}
          value={price}
          onChange={(event) => {
            const newPrice = event.target.value.replace(/[^0-9.-]/g, "");
            setPrice(newPrice);
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
            theme="light"
            style={{ justifySelf: "end" }}
          />
          <label>{t("common.datetime")}</label>
          <input
            className="light"
            type="datetime-local"
            value={spendDatetime}
            onChange={(event) => setSpendDatetime(event.target.value)}
          />
          <label>{t("common.note")}</label>
          <textarea
            className="light"
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
