import React, { useEffect, useRef } from "react";

import {
  faFaucet,
  faGasPump,
  faHamburger,
  faHome,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import VerticalScrollSelect from "../../components/VerticalScrollSelect";
import Modal from "../../components/Modal";
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
  },
  {
    value: "house",
    displayText: "Housing",
    icon: faHome,
  },
  {
    value: "food",
    displayText: "Food",
    icon: faHamburger,
  },
  {
    value: "water",
    displayText: "Water",
    icon: faFaucet,
  },
  {
    value: "travel",
    displayText: "Travel",
    icon: faPlane,
  },
  {
    value: "food1",
    displayText: "Food1",
    icon: faHamburger,
  },
  {
    value: "water1",
    displayText: "Water1",
    icon: faFaucet,
  },
  {
    value: "travel1",
    displayText: "Travel1",
    icon: faPlane,
  },
  {
    value: "food2",
    displayText: "Food2",
    icon: faHamburger,
  },
  {
    value: "water2",
    displayText: "Water2",
    icon: faFaucet,
  },
  {
    value: "travel2",
    displayText: "Travel2",
    icon: faPlane,
  },
];

function NewTransactionModal({
  open,
  onClose,
}: NewTransactionModalProp): JSX.Element {
  const { t } = useTranslation();
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      amountInputRef.current?.focus();
    }
  }, [open]);

  return (
    <Modal
      title={t("parts.new-transaction-modal.title")}
      open={open}
      onClose={onClose}
    >
      <div className="new-transaction">
        <label>{t("common.category")}</label>
        <VerticalScrollSelect
          className="cat-input"
          onSelect={(value) => console.log("Select: ", value)}
          options={mockCategories}
        />
        <label>{t("Price")}</label>
        <input type="number" placeholder="Amount" ref={amountInputRef} />
      </div>
    </Modal>
  );
}

export default NewTransactionModal;
