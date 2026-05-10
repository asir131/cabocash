import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ActionCard } from "../components/ActionCard";
import { AppHeader } from "../components/AppHeader";
import { BalanceCard } from "../components/BalanceCard";
import { TransactionItem } from "../components/TransactionItem";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";
import { useTransactions } from "../context/TransactionContext";
import { RootStackParamList } from "../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { transactions } = useTransactions();
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={styles.brandWrap}>
          <Image source={require("../../assets/design-reference.jpg")} style={styles.logo} />
          <AppHeader greeting={t("home.greeting")} right={<Ionicons name="notifications-outline" size={28} color={colors.primary} />} />
        </View>
      </View>
      <BalanceCard onPressDetails={() => navigation.navigate("BalanceDetails")} />
      <View style={styles.actions}>
        <ActionCard title={t("home.send")} color={colors.primary} icon="paper-plane" onPress={() => navigation.navigate("SendMoney")} />
        <ActionCard title={t("home.request")} color={colors.red} icon="people" onPress={() => navigation.navigate("RequestMoney")} />
        <ActionCard title={t("home.topup")} color={colors.gold} icon="add" onPress={() => navigation.navigate("TopUp")} />
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t("home.recent")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: "TransactionsTab" })}>
          <Text style={styles.link}>{t("home.seeAll")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listCard}>
        {transactions.slice(0, 3).map((transaction) => (
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
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 26
  },
  headerRow: {
    marginBottom: 4
  },
  brandWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  logo: {
    width: 42,
    height: 42,
    resizeMode: "contain"
  },
  actions: {
    flexDirection: "row",
    gap: 18,
    marginTop: 26,
    marginBottom: 34
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900"
  },
  link: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "800"
  },
  listCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 4
  }
});
