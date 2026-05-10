import { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppHeader } from "../components/AppHeader";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";
import { RootStackParamList } from "../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList, "TopUp">;

type TopUpOption = {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
};

const topUpOptions: TopUpOption[] = [
  {
    title: "Open Banking",
    subtitle: "Connect your bank and add money instantly.",
    icon: "business-outline",
    color: colors.primary
  },
  {
    title: "Revolut",
    subtitle: "Top up using your Revolut account.",
    icon: "card-outline",
    color: colors.green
  },
  {
    title: "MB WAY",
    subtitle: "Use MB WAY to add money to Cabocash.",
    icon: "phone-portrait-outline",
    color: colors.red
  }
];

export function TopUpScreen({ navigation }: { navigation: Navigation }) {
  const { t } = useLanguage();

  return (
    <View style={styles.screen}>
      <AppHeader showBack title={t("topUp.title")} />
      <Text style={styles.subtitle}>{t("topUp.subtitle")}</Text>
      <View style={styles.optionList}>
        {topUpOptions.map((option) => (
          <TouchableOpacity
            key={option.title}
            style={styles.optionCard}
            onPress={() => navigation.navigate("BalanceDetails")}
            activeOpacity={0.84}
          >
            <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
              <Ionicons name={option.icon} size={24} color={colors.white} />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#A7AFBF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 48,
    paddingHorizontal: 24
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    marginTop: 2,
    marginBottom: 18
  },
  optionList: {
    gap: 12
  },
  optionCard: {
    minHeight: 82,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 13
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  optionText: {
    flex: 1
  },
  optionTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900"
  },
  optionSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 4
  }
});
