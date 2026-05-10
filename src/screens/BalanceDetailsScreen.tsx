import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "../components/AppHeader";
import { TransactionItem } from "../components/TransactionItem";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";
import { useTransactions } from "../context/TransactionContext";
import { Transaction, TransactionType } from "../types/transaction";

const availableBalance = 12500;

const detailHistory: Transaction[] = [
  {
    id: "detail-topup-1",
    type: "topup",
    title: "Top up added",
    subtitle: "Today, 09:00",
    amount: 5000,
    createdAt: new Date().toISOString()
  },
  {
    id: "detail-request-1",
    type: "request",
    title: "Pending request money",
    subtitle: "Today, 08:30",
    amount: 1800,
    createdAt: new Date().toISOString()
  }
];

function formatAmount(amount: number) {
  return `${amount.toLocaleString("pt-PT")} CVE`;
}

function totalFor(transactions: Transaction[], type: TransactionType) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
}

export function BalanceDetailsScreen() {
  const { transactions } = useTransactions();
  const { t } = useLanguage();
  const history = [...detailHistory, ...transactions];
  const totalSent = totalFor(history, "sent");
  const pendingRequests = totalFor(history, "request");
  const topUpTotal = totalFor(history, "topup");

  const summary = [
    {
      label: t("balanceDetails.availableBalance"),
      value: formatAmount(availableBalance),
      icon: "wallet-outline" as const,
      color: colors.primary
    },
    {
      label: t("balanceDetails.totalSent"),
      value: formatAmount(totalSent),
      icon: "paper-plane-outline" as const,
      color: colors.red
    },
    {
      label: t("balanceDetails.pendingRequest"),
      value: formatAmount(pendingRequests),
      icon: "people-outline" as const,
      color: colors.gold
    },
    {
      label: t("balanceDetails.topUpTotal"),
      value: formatAmount(topUpTotal),
      icon: "add-circle-outline" as const,
      color: colors.green
    }
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <AppHeader showBack title={t("balanceDetails.title")} />
      <View style={styles.summaryGrid}>
        {summary.map((item) => (
          <View key={item.label} style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={22} color={colors.white} />
            </View>
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t("balanceDetails.transactionHistory")}</Text>
      <View style={styles.historyCard}>
        {history.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 28
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 18
  },
  summaryCard: {
    flexGrow: 1,
    flexBasis: "47%",
    minHeight: 132,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    padding: 14,
    justifyContent: "space-between"
  },
  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10
  },
  summaryValue: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 26,
    marginBottom: 12
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 4
  }
});
