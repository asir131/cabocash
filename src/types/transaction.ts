export type TransactionType = "sent" | "received" | "request" | "topup";

export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  titleKey?: string;
  subtitleKey?: string;
  amount: number;
  createdAt: string;
};
