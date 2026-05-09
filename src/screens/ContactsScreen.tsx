import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { contacts } from "../constants/dummyData";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";

export function ContactsScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t("contacts.title")}</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
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
    gap: 12
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
  name: {
    color: colors.navy,
    fontWeight: "900",
    fontSize: 17
  },
  phone: {
    color: colors.muted,
    marginTop: 3,
    fontWeight: "600"
  }
});
