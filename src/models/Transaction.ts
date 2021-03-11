import {Optional} from "../types";

class Transaction {
    constructor(
        public id: number,
        public spendDatetime: Date,
        public title: string,
        private titleWords: [string],
        public categories: [string],
        public price: number,
        public isUnexpected: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Optional<Date>
    ) {
    }
}

export default Transaction;
