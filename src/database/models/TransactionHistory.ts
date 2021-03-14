type TransactionHistoryContent = null | undefined | number | string | Date;

class TransactionHistory {
  constructor(
    public id: number,
    public transactionId: number,
    public field: string,
    public oldContent: TransactionHistoryContent,
    public newContent: TransactionHistoryContent,
    public createdAt: Date
  ) {}
}

export default TransactionHistory;
