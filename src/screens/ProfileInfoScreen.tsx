import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppHeader } from "../components/AppHeader";
import { colors } from "../constants/colors";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileInfo">;

const infoContent = {
  security: {
    title: "Security",
    body: "Cabocash keeps your account access behind your login details. Keep your password private, use a strong password, and log out from Profile when you finish using the app on a shared phone."
  },
  help: {
    title: "Help",
    body: "Cabocash is a simple wallet app for checking your balance, sending money, requesting money, topping up, and managing contacts. For support, review your profile details and make sure your phone number is correct."
  }
};

export function ProfileInfoScreen({ route }: Props) {
  const content = infoContent[route.params.type];

  return (
    <View style={styles.screen}>
      <AppHeader showBack title={content.title} />
      <View style={styles.iconPanel}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.body}>{content.body}</Text>
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
  iconPanel: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    padding: 20,
    marginTop: 16
  },
  title: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 23
  }
});
