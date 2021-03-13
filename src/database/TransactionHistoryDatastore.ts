import AbstractDatastore from "./AbstractDatastore";
import { TransactionHistory } from "../models";

class TransactionHistoryDatastore extends AbstractDatastore<TransactionHistory> {}

export default TransactionHistoryDatastore;
