import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";

type AppHeaderProps = {
  title?: string;
  greeting?: string;
  right?: ReactNode;
  showBack?: boolean;
};

export function AppHeader({ title, greeting, right, showBack }: AppHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()} activeOpacity={0.75}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : null}
        <Text style={greeting ? styles.greeting : styles.title}>{greeting || title}</Text>
      </View>
      {right || <View style={styles.iconButton} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 14
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  greeting: {
    color: colors.navy,
    fontSize: 23,
    fontWeight: "800"
  },
  title: {
    flex: 1,
    color: colors.primary,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginRight: 42
  }
});
