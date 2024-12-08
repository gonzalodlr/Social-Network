/** @format */

import React from "react";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { StatusBar } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <StatusBar hidden={true} />
      <Logo />
      <Header>Welcome to PostTopia</Header>
      <Paragraph>Social Network</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Create an account
      </Button>
    </Background>
  );
}
