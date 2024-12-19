/** @format */

import React, { useState } from "react";
import { Platform } from "react-native";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web";

const options = {
  method: "POST",
  url: "https://rapidmail.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": "f67aef3d55msh0ad692fda3e2911p130816jsn6598e2a129ed",
    "x-rapidapi-host": "rapidmail.p.rapidapi.com",
    "Content-Type": "application/json",
  },
  data: {
    ishtml: "false",
    sendto: "test@go-mail.us.to",
    name: "Put Any Custom Name here",
    replyTo: "admin@go-mail.us.to",
    title: "Testing RapidMail Api",
    body: "Put your Text body here, if you want to send html just set the ishtml: true in the request body",
  },
};

const sendEmail = async (email, password) => {
  try {
    // cambiar en options.data.sendto: email a email.value
    options.data.sendto = email;
    options.data.body = "Your password is: " + password;

    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    let user;
    if (isWeb) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      user = users.find((user) => user.email === email.value);
    } else {
      const data = await AsyncStorage.getItem("users");
      const users = data ? JSON.parse(data) : [];
      user = users.find((user) => user.email === email.value);
    }

    if (!user) {
      setEmail({ ...email, error: "Email not found" });
      return;
    }

    const password = user.password;
    await sendEmail(email.value, password);
    console.log(email.value);
    console.log(password);

    navigation.navigate("LoginScreen");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reset your password.</Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with the reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Continue
      </Button>
    </Background>
  );
}
