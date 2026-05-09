import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "../components/AppHeader";
import { MenuItem } from "../components/MenuItem";
import { colors } from "../constants/colors";
import { languageOptions } from "../constants/text";
import { useLanguage } from "../context/LanguageContext";

export function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const currentLanguageTitle = languageOptions.find((option) => option.code === language)?.title ?? "Português";

  return (
    <View style={styles.screen}>
      <AppHeader title={t("profile.title")} right={<Ionicons name="settings-outline" size={24} color={colors.primary} />} />
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={colors.white} />
        </View>
        <View>
          <Text style={styles.name}>Maria Silva</Text>
          <Text style={styles.phone}>+238 912 34 56</Text>
        </View>
      </View>
      <View style={styles.menu}>
        <MenuItem icon="globe-outline" title={t("profile.language")} value={currentLanguageTitle} onPress={() => setModalVisible(true)} />
        <MenuItem icon="shield-checkmark-outline" title={t("profile.security")} />
        <MenuItem icon="help-circle-outline" title={t("profile.help")} />
        <MenuItem icon="log-out-outline" title={t("profile.logout")} />
      </View>

      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t("profile.languagePrompt")}</Text>
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.code}
                style={styles.languageRow}
                onPress={() => {
                  setLanguage(option.code);
                  setModalVisible(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.flag}>{option.flag}</Text>
                <View style={styles.languageText}>
                  <Text style={styles.languageTitle}>{option.title}</Text>
                  <Text style={styles.languageSubtitle}>{option.subtitle}</Text>
                </View>
                {language === option.code ? <Ionicons name="checkmark" size={24} color={colors.primary} /> : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 32,
    marginBottom: 38
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    color: colors.navy,
    fontSize: 19,
    fontWeight: "900"
  },
  phone: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 3
  },
  menu: {
    gap: 0
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(16,42,99,0.35)",
    justifyContent: "flex-end",
    paddingBottom: 72
  },
  modalCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 22,
    paddingBottom: 34
  },
  modalTitle: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16
  },
  languageRow: {
    minHeight: 70,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12
  },
  flag: {
    fontSize: 32
  },
  languageText: {
    flex: 1
  },
  languageTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  languageSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  }
});
