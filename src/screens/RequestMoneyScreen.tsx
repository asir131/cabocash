import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "../components/AppHeader";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";

export function RequestMoneyScreen({ navigation }: { navigation: any }) {
  const { t } = useLanguage();

  return (
    <View style={styles.screen}>
      <AppHeader showBack title={t("request.title")} />
      <View style={styles.illustrationWrap}>
        <View style={styles.coinLeft}>
          <Ionicons name="cash" size={18} color={colors.white} />
        </View>
        <View style={styles.coinRight}>
          <Ionicons name="star" size={17} color={colors.white} />
        </View>
        <View style={styles.handLeft} />
        <View style={styles.phoneCard}>
          <Image source={require("../../assets/design-reference.jpg")} style={styles.logo} />
          <View style={styles.receiptLine} />
          <View style={[styles.receiptLine, { width: 46 }]} />
          <View style={[styles.receiptLine, { width: 58 }]} />
        </View>
        <View style={styles.handRight} />
      </View>
      <Text style={styles.title}>{t("request.heading")}</Text>
      <Text style={styles.subtitle}>{t("request.subtitle")}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RequestMoneyForm")} activeOpacity={0.86}>
        <Text style={styles.buttonText}>{t("request.button")}</Text>
      </TouchableOpacity>
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
  illustrationWrap: {
    height: 230,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
    marginBottom: 18
  },
  phoneCard: {
    width: 104,
    height: 158,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: "#DDE6F7",
    alignItems: "center",
    paddingTop: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6
  },
  logo: {
    width: 58,
    height: 58,
    resizeMode: "contain",
    marginBottom: 16
  },
  receiptLine: {
    width: 62,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#D9E2F5",
    marginBottom: 8
  },
  coinLeft: {
    position: "absolute",
    top: 28,
    left: 82,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center"
  },
  coinRight: {
    position: "absolute",
    top: 34,
    right: 80,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center"
  },
  handLeft: {
    position: "absolute",
    left: 48,
    bottom: 34,
    width: 62,
    height: 88,
    borderRadius: 28,
    backgroundColor: "#B86F49",
    transform: [{ rotate: "-18deg" }]
  },
  handRight: {
    position: "absolute",
    right: 48,
    bottom: 40,
    width: 62,
    height: 78,
    borderRadius: 28,
    backgroundColor: "#A96743",
    transform: [{ rotate: "24deg" }]
  },
  title: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
    marginHorizontal: 18
  },
  button: {
    height: 54,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800"
  }
});
