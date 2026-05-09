import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "../components/AppHeader";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";
import { useTransactions } from "../context/TransactionContext";

export function RequestMoneyFormScreen({ navigation }: { navigation: any }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const { t } = useLanguage();
  const { addTransaction } = useTransactions();

  function handleSendRequest() {
    const numericAmount = Number(amount.replace(/[^\d]/g, ""));
    if (!phone.trim() || !numericAmount) {
      Alert.alert(t("requestForm.alertTitle"), t("requestForm.alertMessage"));
      return;
    }

    addTransaction({
      type: "request",
      title: "Pedido enviado",
      subtitle: "Agora mesmo",
      titleKey: "tx.requestSent",
      subtitleKey: "tx.now",
      amount: numericAmount
    });

    navigation.navigate("MainTabs", { screen: "HomeTab" });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <AppHeader showBack title={t("requestForm.title")} />
      <View style={styles.form}>
        <Text style={styles.label}>{t("requestForm.phoneLabel")}</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder={t("requestForm.phonePlaceholder")}
            placeholderTextColor="#79839A"
            keyboardType="phone-pad"
            style={styles.input}
          />
          <View style={styles.inputDivider} />
          <Ionicons name="person-outline" size={23} color={colors.primary} />
        </View>

        <Text style={styles.label}>{t("requestForm.amountLabel")}</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder={t("requestForm.amountPlaceholder")}
            placeholderTextColor={colors.navy}
            keyboardType="numeric"
            style={styles.amountInput}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSendRequest} activeOpacity={0.86}>
        <Text style={styles.buttonText}>{t("requestForm.button")}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 48,
    paddingHorizontal: 24
  },
  form: {
    marginTop: 18
  },
  label: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 16
  },
  inputRow: {
    height: 58,
    borderRadius: 9,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  input: {
    flex: 1,
    color: colors.navy,
    fontSize: 15,
    fontWeight: "600"
  },
  inputDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
    marginRight: 14
  },
  inputBox: {
    height: 78,
    borderRadius: 9,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    justifyContent: "center",
    paddingHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  amountInput: {
    color: colors.navy,
    fontSize: 21,
    fontWeight: "800"
  },
  button: {
    height: 54,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800"
  }
});
