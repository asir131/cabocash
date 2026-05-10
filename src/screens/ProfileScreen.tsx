import { useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppHeader } from "../components/AppHeader";
import { MenuItem } from "../components/MenuItem";
import { colors } from "../constants/colors";
import { languageOptions } from "../constants/text";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { RootStackParamList } from "../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<Navigation>();
  const [modalVisible, setModalVisible] = useState(false);
  const { signOut, updateAvatar, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const currentLanguageTitle = languageOptions.find((option) => option.code === language)?.title ?? "Portuguese";

  async function handlePickAvatar() {
    let imagePicker: typeof import("expo-image-picker");

    try {
      imagePicker = require("expo-image-picker");
    } catch {
      Alert.alert("Rebuild required", "Profile image upload is installed, but the Android app needs to be rebuilt once before it can open the gallery.");
      return;
    }

    const permission = await imagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert("Permission required", "Allow photo access to upload a profile image.");
      return;
    }

    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canceled) {
      updateAvatar(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.screen}>
      <AppHeader title={t("profile.title")} />
      <View style={styles.profileRow}>
        <TouchableOpacity style={styles.avatarButton} onPress={handlePickAvatar} activeOpacity={0.82}>
          {user.avatarUri ? <Image source={{ uri: user.avatarUri }} style={styles.avatarImage} /> : <Ionicons name="person" size={48} color={colors.white} />}
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={15} color={colors.white} />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
        </View>
      </View>
      <View style={styles.menu}>
        <MenuItem icon="globe-outline" title={t("profile.language")} value={currentLanguageTitle} onPress={() => setModalVisible(true)} />
        <MenuItem icon="shield-checkmark-outline" title={t("profile.security")} onPress={() => navigation.navigate("ProfileInfo", { type: "security" })} />
        <MenuItem icon="help-circle-outline" title={t("profile.help")} onPress={() => navigation.navigate("ProfileInfo", { type: "help" })} />
        <MenuItem icon="log-out-outline" title={t("profile.logout")} onPress={signOut} />
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
  avatarButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36
  },
  cameraBadge: {
    position: "absolute",
    right: -1,
    bottom: -1,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.red,
    borderWidth: 2,
    borderColor: colors.background,
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
