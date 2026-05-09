import { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

type MenuItemProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  title: string;
  value?: string;
  onPress?: () => void;
};

export function MenuItem({ icon, title, value, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.78} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={18} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        <Ionicons name="chevron-forward" size={20} color="#A7AFBF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 58,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 12
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: colors.navy,
    fontWeight: "700",
    fontSize: 15
  },
  value: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600"
  }
});
