interface TransactionSchema {
  id: string;
  icon:
    | "wallet-plus"
    | "data-matrix-scan"
    | "account-arrow-left"
    | "account-arrow-right";
  transferAccount: string;
  transferAction: string;
  add: boolean;
  amount: number;
  date: string;
  month: string;
}
