import React from "react";

import {
  faHome,
  faFaucet,
  faPlug,
  faUtensils,
  faHamburger,
  faIceCream,
  faPizzaSlice,
  faBreadSlice,
  faCoffee,
  faCocktail,
  faWineBottle,
  faWineGlass,
  faGasPump,
  faCar,
  faMotorcycle,
  faBicycle,
  faPlane,
  faShip,
  faPhone,
  faMobile,
  faWifi,
  faMedkit,
  faHeartbeat,
  faBriefcase,
  faTicketAlt,
  faFilm,
  faBook,
  faUniversity,
  faPiggyBank,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import { Transaction } from "../../../database";
import "./TransactionRow.less";

const icons = {
  faHome,
  faFaucet,
  faPlug,
  faUtensils,
  faHamburger,
  faIceCream,
  faPizzaSlice,
  faBreadSlice,
  faCoffee,
  faCocktail,
  faWineBottle,
  faWineGlass,
  faGasPump,
  faCar,
  faMotorcycle,
  faBicycle,
  faPlane,
  faShip,
  faPhone,
  faMobile,
  faWifi,
  faMedkit,
  faHeartbeat,
  faBriefcase,
  faTicketAlt,
  faFilm,
  faBook,
  faUniversity,
  faPiggyBank,
  faRandom,
};

type IconName = keyof typeof icons;

interface TransactionRowProp {
  transaction: Transaction;
}

function TransactionRow({ transaction }: TransactionRowProp): JSX.Element {
  const icon = icons[transaction.icon as IconName];

  return (
    <div className="transaction-row">
      <FontAwesomeIcon icon={icon} size="lg" className="transaction-icon" />
      <div className="transaction-category">{transaction.leafCategory}</div>
      <div className="transaction-time">
        {format(transaction.spendDatetime, "Y-M-d")}
      </div>
      <div className="transaction-price">{transaction.price}</div>
    </div>
  );
}

export default TransactionRow;
