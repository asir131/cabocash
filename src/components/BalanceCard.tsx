import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";

export function BalanceCard() {
  const { t } = useLanguage();

  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <View>
        <Text style={styles.label}>{t("home.balanceLabel")}</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.amount}>12.500</Text>
          <Text style={styles.currency}>CVE</Text>
        </View>
        <TouchableOpacity style={styles.details} activeOpacity={0.75}>
          <Text style={styles.detailsText}>{t("home.details")}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Ionicons name="eye-outline" size={38} color={colors.white} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    minHeight: 164,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.95,
    marginBottom: 10
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8
  },
  amount: {
    color: colors.white,
    fontSize: 43,
    lineHeight: 48,
    fontWeight: "900"
  },
  currency: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: "800"
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13
  },
  detailsText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700"
  }
});
