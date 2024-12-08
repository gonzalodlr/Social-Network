/** @format */

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
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
import { nameValidator } from "../helpers/nameValidator";
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

const writeUsersFile = async (data) => {
  try {
    if (isWeb) {
      localStorage.setItem("users", JSON.stringify(data));
    } else {
      await AsyncStorage.setItem("users", JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error al escribir los usuarios:", error);
  }
};

export default function RegisterScreen({ navigation }) {
  initializeStorage();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  // Registra un nuevo usuario
  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    try {
      const users = await readUsersFile();
      users.push(newUser);
      await writeUsersFile(users);

      // Limpiar campos
      setName("");
      setEmail("");
      setPassword("");

      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen", params: { nombre: newUser.nombre } }],
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome.</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
      <View style={styles.row}>
        <Text>I already have an account !</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
