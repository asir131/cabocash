import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";

type PhoneContact = {
  id: string;
  name: string;
  phone?: string;
};

function getDeviceContacts(contacts: Contacts.Contact[]): PhoneContact[] {
  return contacts
    .map((contact, contactIndex) => {
      const phoneNumber = contact.phoneNumbers?.find((item) => item.number || item.digits);
      const phone = (phoneNumber?.number ?? phoneNumber?.digits ?? "").trim();

      return {
        id: contact.id ?? `${contactIndex}`,
        name: contact.name || phone || "Unknown",
        phone: phone || undefined
      };
    })
    .filter((contact) => contact.name || contact.phone);
}

export function ContactsScreen() {
  const { t } = useLanguage();
  const [phoneContacts, setPhoneContacts] = useState<PhoneContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadContacts() {
      setLoadingContacts(true);

      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(t("send.contactsPermissionTitle"), t("send.contactsPermissionMessage"));
          return;
        }

        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName
        });

        if (isMounted) {
          setPhoneContacts(getDeviceContacts(data));
        }
      } catch {
        Alert.alert(t("send.contactsErrorTitle"), t("send.contactsErrorMessage"));
      } finally {
        if (isMounted) {
          setLoadingContacts(false);
        }
      }
    }

    void loadContacts();

    return () => {
      isMounted = false;
    };
  }, [t]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t("contacts.title")}</Text>
      {loadingContacts ? (
        <View style={styles.emptyState}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.emptyText}>{t("send.contactsLoading")}</Text>
        </View>
      ) : phoneContacts.length ? (
        <FlatList
          data={phoneContacts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={colors.primary} />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                {item.phone ? (
                  <Text style={styles.phone} numberOfLines={1}>
                    {item.phone}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>{t("send.noContacts")}</Text>
        </View>
      )}
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
    gap: 12,
    paddingBottom: 20
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#EEF1F5"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center"
  },
  contactText: {
    flex: 1
  },
  name: {
    color: colors.navy,
    fontWeight: "900",
    fontSize: 17
  },
  phone: {
    color: colors.muted,
    marginTop: 3,
    fontWeight: "600"
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
});
