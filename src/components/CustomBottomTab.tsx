import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { useLanguage } from "../context/LanguageContext";

const tabMeta: Record<string, { labelKey: "tabs.home" | "tabs.transactions" | "tabs.contacts" | "tabs.profile"; icon: keyof typeof Ionicons.glyphMap }> = {
  HomeTab: { labelKey: "tabs.home", icon: "home" },
  TransactionsTab: { labelKey: "tabs.transactions", icon: "card-outline" },
  ContactsTab: { labelKey: "tabs.contacts", icon: "people-outline" },
  ProfileTab: { labelKey: "tabs.profile", icon: "person-outline" }
};

export function CustomBottomTab({ state, descriptors, navigation }: BottomTabBarProps) {
  const { t } = useLanguage();

  return (
    <View style={styles.shell}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const isCenter = route.name === "ScanTab";
        const options = descriptors[route.key].options;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isCenter) {
          return (
            <TouchableOpacity key={route.key} style={styles.centerSlot} activeOpacity={0.85} onPress={onPress}>
              <View style={styles.centerButton}>
                <MaterialCommunityIcons name="line-scan" size={24} color={colors.white} />
              </View>
            </TouchableOpacity>
          );
        }

        const meta = tabMeta[route.name];
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <Ionicons name={focused ? meta.icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap : meta.icon} size={21} color={focused ? colors.primary : "#66708A"} />
            <Text style={[styles.label, focused && styles.labelActive]}>{t(meta.labelKey)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    height: 72,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#EFF2F7",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 7,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3
  },
  label: {
    color: "#66708A",
    fontSize: 10,
    fontWeight: "600"
  },
  labelActive: {
    color: colors.primary,
    fontWeight: "800"
  },
  centerSlot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 8
  }
});
