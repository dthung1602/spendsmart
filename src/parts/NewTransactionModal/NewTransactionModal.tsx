import React, { useEffect, useState, useRef } from "react";

import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faFaucet,
  faGasPump,
  faHamburger,
  faHome,
  faPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import VerticalScrollSelect from "../../components/VerticalScrollSelect";
import Modal from "../../components/Modal";
import Accordion from "../../components/Accordion";
import type { ModalButton } from "../../components/Modal/Modal";
import { useTranslation } from "../../utils/hooks";
import "./NewTransactionModal.less";

interface NewTransactionModalProp {
  open: boolean;
  onClose: () => void;
}

const mockCategories = [
  {
    value: "gas",
    displayText: "Gas",
    icon: faGasPump,
    nested: false,
  },
  {
    value: "house",
    displayText: "Housing",
    icon: faHome,
    nested: false,
  },
  {
    value: "food",
    displayText: "Food",
    icon: faHamburger,
    nested: false,
  },
  {
    value: "water",
    displayText: "Water",
    icon: faFaucet,
    nested: false,
  },
  {
    value: "travel",
    displayText: "Travel",
    icon: faPlane,
    nested: true,
  },
  {
    value: "food1",
    displayText: "Food1",
    icon: faHamburger,
    nested: true,
  },
  {
    value: "water1",
    displayText: "Water1",
    icon: faFaucet,
    nested: true,
  },
  {
    value: "travel1",
    displayText: "Travel1",
    icon: faPlane,
    nested: true,
  },
  {
    value: "food2",
    displayText: "Food2",
    icon: faHamburger,
    nested: false,
  },
  {
    value: "water2",
    displayText: "Water2",
    icon: faFaucet,
    nested: true,
  },
  {
    value: "travel2",
    displayText: "Travel2",
    icon: faPlane,
    nested: false,
  },
];

function NewTransactionModal({
  open,
  onClose,
}: NewTransactionModalProp): JSX.Element {
  const [expand, setExpand] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(mockCategories[0].value);

  const { t } = useTranslation();
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      amountInputRef.current?.focus();
    }
  }, [open]);

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
      onClick: () => console.log("ADD"),
    },
  ];

  return (
    <Modal
      title={t("parts.new-transaction-modal.title")}
      open={open}
      onClose={onClose}
      buttons={buttons}
    >
      <div className="new-transaction">
        <label>{t("common.price")}</label>
        <input type="number" placeholder="$" ref={amountInputRef} />
        <label>{t("common.category")}</label>
        <VerticalScrollSelect
          className="cat-input"
          onSelect={(value) => setCategory(value)}
          options={mockCategories}
        />
      </div>
      <Accordion expand={expand} className="new-transaction">
        <label>{t("common.unexpected-spending")}</label>
        <input type="checkbox" />
        <label>{t("common.datetime")}</label>
        <input type="datetime-local" />
        <label>{t("common.note")}</label>
        <textarea placeholder="Note" />
      </Accordion>
    </Modal>
  );
}

export default NewTransactionModal;
