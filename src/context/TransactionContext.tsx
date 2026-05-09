import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { initialTransactions } from "../constants/dummyData";
import { loadTransactions, saveTransactions } from "../storage/transactionStorage";
import { Transaction } from "../types/transaction";

type TransactionContextValue = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => void;
};

const TransactionContext = createContext<TransactionContextValue | undefined>(undefined);

function withTranslationKeys(transaction: Transaction): Transaction {
  if (transaction.titleKey && transaction.subtitleKey) {
    return transaction;
  }

  const titleKey =
    transaction.id === "tx-1"
      ? "tx.sentJoao"
      : transaction.id === "tx-2"
        ? "tx.receivedAna"
        : transaction.id === "tx-3"
          ? "tx.sentPedro"
          : transaction.type === "request"
            ? "tx.requestSent"
            : transaction.type === "sent"
              ? "tx.sentNew"
              : transaction.titleKey;

  const subtitleKey =
    transaction.id === "tx-1"
      ? "tx.today1030"
      : transaction.id === "tx-2"
        ? "tx.yesterday1845"
        : transaction.id === "tx-3"
          ? "tx.may12"
          : transaction.subtitleKey ?? "tx.now";

  return {
    ...transaction,
    titleKey,
    subtitleKey
  };
}

export function TransactionProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadTransactions()
      .then((stored) => {
        if (stored?.length) {
          setTransactions(stored.map(withTranslationKeys));
        }
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) {
      saveTransactions(transactions).catch(() => undefined);
    }
  }, [ready, transactions]);

  const value = useMemo<TransactionContextValue>(
    () => ({
      transactions,
      addTransaction: (transaction) => {
        const next: Transaction = {
          ...transaction,
          id: `tx-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        setTransactions((current) => [next, ...current]);
      }
    }),
    [transactions]
  );

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used inside TransactionProvider");
  }
  return context;
}
