/** @format */

import React from "react";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Tabs } from "expo-router";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("StartScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Background>
      <Tabs hidden={true} />
      <StatusBar hidden={true} />
      <Logo />
      <Header>Welcome 💫</Header>
    </Background>
  );
}
