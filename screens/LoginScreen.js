/** @format */

import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import { Text } from "react-native-paper";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import usersData from "../bbdd/users.json";

import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web";

const initializeStorage = async () => {
  try {
    if (isWeb) {
      const existingData = localStorage.getItem("users");
      if (!existingData) {
        localStorage.setItem("users", JSON.stringify(usersData));
        console.log("Usuarios inicializados en localStorage");
      }
    } else {
      const existingData = await AsyncStorage.getItem("users");
      if (!existingData) {
        await AsyncStorage.setItem("users", JSON.stringify(usersData));
        console.log("Usuarios inicializados en AsyncStorage");
      }
    }
  } catch (error) {
    console.error("Error inicializando el almacenamiento:", error);
  }
};

const readUsersFile = async () => {
  try {
    if (isWeb) {
      const data = localStorage.getItem("users");
      return data ? JSON.parse(data) : [];
    } else {
      const data = await AsyncStorage.getItem("users");
      return data ? JSON.parse(data) : [];
    }
  } catch (error) {
    console.error("Error al leer los usuarios:", error);
    return [];
  }
};

export default function LoginScreen({ navigation }) {
  initializeStorage();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    let user;
    if (isWeb) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      user = users.find(
        (user) => user.email === email.value && user.password === password.value
      );
    } else {
      AsyncStorage.getItem("users").then((data) => {
        const users = data ? JSON.parse(data) : [];
        user = users.find(
          (user) =>
            user.email === email.value && user.password === password.value
        );
      });
    }

    if (!user) {
      setEmail({ ...email, error: "Invalid email or password" });
      setPassword({ ...password, error: "Invalid email or password" });
      return;
    }
    // navega a la pantalla HomeScreen con el nombre del usuario
    navigation.navigate("HomeScreen");
    if (isWeb) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      AsyncStorage.setItem("currentUser", JSON.stringify(user));
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Hello.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      <View style={styles.row}>
        <Text>You do not have an account yet ?</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Create !</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
