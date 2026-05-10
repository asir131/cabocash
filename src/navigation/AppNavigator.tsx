import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { CustomBottomTab } from "../components/CustomBottomTab";
import { colors } from "../constants/colors";
import { BalanceDetailsScreen } from "../screens/BalanceDetailsScreen";
import { ContactsScreen } from "../screens/ContactsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileInfoScreen } from "../screens/ProfileInfoScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RequestMoneyScreen } from "../screens/RequestMoneyScreen";
import { RequestMoneyFormScreen } from "../screens/RequestMoneyFormScreen";
import { SendMoneyScreen } from "../screens/SendMoneyScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { TopUpScreen } from "../screens/TopUpScreen";
import { TransactionsScreen } from "../screens/TransactionsScreen";
import { RootStackParamList, TabParamList } from "./types";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function ScanActionScreen({ navigation }: { navigation: any }) {
  const { t } = useLanguage();

  return (
    <View style={styles.scanScreen}>
      <View style={styles.scanIcon}>
        <Ionicons name="scan" size={52} color={colors.white} />
      </View>
      <Text style={styles.scanTitle}>{t("scan.title")}</Text>
      <Text style={styles.scanText}>{t("scan.text")}</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.getParent()?.navigate("SendMoney")} activeOpacity={0.85}>
        <Text style={styles.primaryText}>{t("scan.send")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.getParent()?.navigate("RequestMoney")} activeOpacity={0.85}>
        <Text style={styles.secondaryText}>{t("scan.request")}</Text>
      </TouchableOpacity>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="TransactionsTab" component={TransactionsScreen} />
      <Tab.Screen name="ScanTab" component={ScanActionScreen} />
      <Tab.Screen name="ContactsTab" component={ContactsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="BalanceDetails" component={BalanceDetailsScreen} />
          <Stack.Screen name="TopUp" component={TopUpScreen} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
          <Stack.Screen name="RequestMoney" component={RequestMoneyScreen} />
          <Stack.Screen name="RequestMoneyForm" component={RequestMoneyFormScreen} />
          <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  scanScreen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  scanIcon: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22
  },
  scanTitle: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: "900"
  },
  scanText: {
    color: colors.muted,
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24
  },
  primaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  secondaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 16
  },
  secondaryText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 16
  }
});
