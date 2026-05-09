import { FlatList, StyleSheet, Text, View } from "react-native";
import { TransactionItem } from "../components/TransactionItem";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";
import { useTransactions } from "../context/TransactionContext";

export function TransactionsScreen() {
  const { transactions } = useTransactions();
  const { t } = useLanguage();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t("transactions.title")}</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.rowCard}>
            <TransactionItem transaction={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 58,
    paddingHorizontal: 22
  },
  title: {
    color: colors.navy,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 18
  },
  list: {
    paddingBottom: 24
  },
  rowCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2
  },
  separator: {
    height: 10
  }
});
