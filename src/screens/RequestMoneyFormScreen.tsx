import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { AppHeader } from "../components/AppHeader";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";
import { useTransactions } from "../context/TransactionContext";

type PhoneContact = {
  id: string;
  name: string;
  phone: string;
};

function getContactsWithPhoneNumbers(contacts: Contacts.Contact[]): PhoneContact[] {
  return contacts.flatMap((contact, contactIndex) => {
    const phoneNumbers = contact.phoneNumbers ?? [];

    return phoneNumbers
      .map((phoneNumber, phoneIndex) => {
        const phone = (phoneNumber.number ?? phoneNumber.digits ?? "").trim();
        if (!phone) {
          return null;
        }

        return {
          id: `${contact.id ?? contactIndex}-${phoneNumber.id ?? phoneIndex}`,
          name: contact.name || phone,
          phone
        };
      })
      .filter((contact): contact is PhoneContact => Boolean(contact));
  });
}

export function RequestMoneyFormScreen({ navigation }: { navigation: any }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [contactPickerVisible, setContactPickerVisible] = useState(false);
  const [deviceContacts, setDeviceContacts] = useState<PhoneContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const { t } = useLanguage();
  const { addTransaction } = useTransactions();

  async function handleOpenContactPicker() {
    setContactPickerVisible(true);
    setLoadingContacts(true);

    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        setContactPickerVisible(false);
        Alert.alert(t("send.contactsPermissionTitle"), t("send.contactsPermissionMessage"));
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName
      });
      setDeviceContacts(getContactsWithPhoneNumbers(data));
    } catch {
      setContactPickerVisible(false);
      Alert.alert(t("send.contactsErrorTitle"), t("send.contactsErrorMessage"));
    } finally {
      setLoadingContacts(false);
    }
  }

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
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("send.selectFromContacts")}
          style={styles.chooseContactButton}
          onPress={handleOpenContactPicker}
          activeOpacity={0.84}
        >
          <Ionicons name="people-outline" size={20} color={colors.primary} />
          <Text style={styles.chooseContactText}>{t("send.selectFromContacts")}</Text>
        </TouchableOpacity>

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

      <Modal transparent visible={contactPickerVisible} animationType="fade" onRequestClose={() => setContactPickerVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.contactSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{t("send.contactPickerTitle")}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setContactPickerVisible(false)} activeOpacity={0.75}>
                <Ionicons name="close" size={22} color={colors.navy} />
              </TouchableOpacity>
            </View>
            {loadingContacts ? (
              <View style={styles.emptyState}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.emptyText}>{t("send.contactsLoading")}</Text>
              </View>
            ) : deviceContacts.length ? (
              <FlatList
                data={deviceContacts}
                keyExtractor={(contact) => contact.id}
                style={styles.contactList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.contactRow}
                    onPress={() => {
                      setPhone(item.phone);
                      setContactPickerVisible(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={styles.contactAvatar}>
                      <Ionicons name="person" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.contactText}>
                      <Text style={styles.contactName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.contactPhone} numberOfLines={1}>
                        {item.phone}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#A7AFBF" />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>{t("send.noContacts")}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  chooseContactButton: {
    minHeight: 48,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "#EAF1FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 10,
    paddingHorizontal: 14
  },
  chooseContactText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "800"
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
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(16,42,99,0.35)",
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 28
  },
  contactSheet: {
    backgroundColor: colors.white,
    borderRadius: 18,
    maxHeight: "72%",
    padding: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 10
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  sheetTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900"
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  contactList: {
    marginTop: 2
  },
  contactRow: {
    minHeight: 66,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    marginTop: 8,
    backgroundColor: colors.background
  },
  contactAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center"
  },
  contactText: {
    flex: 1
  },
  contactName: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  contactPhone: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3
  },
  emptyState: {
    minHeight: 110,
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
});
