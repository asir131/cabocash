import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: { navigation: Navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <View style={styles.brandMark}>
        <Ionicons name="wallet" size={34} color={colors.white} />
      </View>
      <Text style={styles.title}>Welcome to Cabocash</Text>
      <Text style={styles.subtitle}>Log in with your email and password.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="#79839A"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#79839A"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={signIn} activeOpacity={0.86}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate("SignUp")} activeOpacity={0.75}>
          <Text style={styles.createAccountText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  brandMark: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22
  },
  title: {
    color: colors.navy,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 30
  },
  form: {
    gap: 10
  },
  label: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 4
  },
  input: {
    height: 56,
    borderRadius: 9,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    paddingHorizontal: 16,
    color: colors.navy,
    fontSize: 15,
    fontWeight: "600"
  },
  button: {
    height: 54,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  },
  createAccountButton: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 2
  },
  createAccountText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
  }
});
