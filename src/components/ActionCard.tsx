import { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

type ActionCardProps = {
  title: string;
  color: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
};

export function ActionCard({ title, color, icon, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.84}>
      <Ionicons name={icon} size={34} color={colors.white} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 0.92,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800"
  }
});
