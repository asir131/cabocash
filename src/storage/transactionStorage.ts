import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types/transaction";

const STORAGE_KEY = "@cabocash_transactions";

export async function loadTransactions(): Promise<Transaction[] | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Transaction[]) : null;
}

export async function saveTransactions(transactions: Transaction[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}
