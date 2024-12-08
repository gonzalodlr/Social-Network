/** @format */

import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { router, RelativePathString } from "expo-router";
const logo = require("@/assets/images/logo.png");

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  function Login() {
    console.log("Iniciar sesión");
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    console.log("Email:", email);
    console.log("Password:", password);
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        id="email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        id="password"
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={Login} />
      <TouchableOpacity
        onPress={() => {
          router.push("/signup" as RelativePathString);
        }}
      >
        <Text style={styles.registerText}>
          ¿No tienes una cuenta? Regístrate aquí...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  registerText: {
    marginTop: 16,
    color: "#007BFF",
  },
});

export default LoginScreen;
