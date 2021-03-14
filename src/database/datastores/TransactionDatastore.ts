import AbstractDatastore from "./AbstractDatastore";
import { Transaction } from "../models";

class TransactionDatastore extends AbstractDatastore<Transaction> {}

export default TransactionDatastore;
