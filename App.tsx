import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LanguageProvider } from "./src/context/LanguageContext";
import { TransactionProvider } from "./src/context/TransactionContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <TransactionProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </TransactionProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
