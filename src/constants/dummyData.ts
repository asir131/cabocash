import { Transaction } from "../types/transaction";

export const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    type: "sent",
    title: "Enviado para João",
    subtitle: "Hoje, 10:30",
    titleKey: "tx.sentJoao",
    subtitleKey: "tx.today1030",
    amount: -2000,
    createdAt: new Date().toISOString()
  },
  {
    id: "tx-2",
    type: "received",
    title: "Recebido de Ana",
    subtitle: "Ontem, 18:45",
    titleKey: "tx.receivedAna",
    subtitleKey: "tx.yesterday1845",
    amount: 1500,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "tx-3",
    type: "sent",
    title: "Enviado para Pedro",
    subtitle: "12 Mai, 09:15",
    titleKey: "tx.sentPedro",
    subtitleKey: "tx.may12",
    amount: -500,
    createdAt: "2026-05-12T09:15:00.000Z"
  }
];

export const contacts = [
  { id: "1", name: "João", phone: "+238 991 22 33" },
  { id: "2", name: "Ana", phone: "+238 925 44 18" },
  { id: "3", name: "Pedro", phone: "+238 987 65 43" }
];
