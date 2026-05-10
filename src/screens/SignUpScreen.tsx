import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "../components/AppHeader";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export function SignUpScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignUp() {
    if (!email.trim() || !name.trim() || !phone.trim() || !password) {
      Alert.alert("Required fields", "Please fill in your email, name, phone number, and password.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Confirm password must match your password.");
      return;
    }

    signUp({ email: email.trim(), name: name.trim(), phone: phone.trim() });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <AppHeader showBack title="Create account" />
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="person-add" size={28} color={colors.white} />
        </View>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View style={styles.form}>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#79839A" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
        <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#79839A" style={styles.input} />
        <TextInput value={phone} onChangeText={setPhone} placeholder="Phone number" placeholderTextColor="#79839A" keyboardType="phone-pad" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#79839A" secureTextEntry style={styles.input} />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          placeholderTextColor="#79839A"
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.86}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 48,
    paddingHorizontal: 24
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 8,
    marginBottom: 22
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: colors.navy,
    fontSize: 25,
    fontWeight: "900"
  },
  form: {
    gap: 12
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
    marginTop: 24
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  }
});
