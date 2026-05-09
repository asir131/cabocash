import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { TranslationKey } from "../constants/text";
import { useLanguage } from "../context/LanguageContext";
import { Transaction, TransactionType } from "../types/transaction";

const config: Record<TransactionType, { icon: ComponentProps<typeof Ionicons>["name"]; color: string }> = {
  sent: { icon: "paper-plane", color: colors.primary },
  received: { icon: "git-compare", color: colors.green },
  request: { icon: "people", color: colors.red },
  topup: { icon: "add", color: colors.gold }
};

function formatAmount(amount: number) {
  const sign = amount > 0 ? "+" : "";
  return `${sign}${amount.toLocaleString("pt-PT")} CVE`;
}

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { t } = useLanguage();
  const item = config[transaction.type];
  const isPositive = transaction.amount > 0;
  const title = transaction.titleKey ? t(transaction.titleKey as TranslationKey) : transaction.title;
  const subtitle = transaction.subtitleKey ? t(transaction.subtitleKey as TranslationKey) : transaction.subtitle;

  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={22} color={colors.white} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Text style={[styles.amount, { color: isPositive ? colors.green : colors.navy }]}>{formatAmount(transaction.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    gap: 14
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  textWrap: {
    flex: 1
  },
  title: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 3
  },
  amount: {
    fontSize: 16,
    fontWeight: "900"
  }
});
