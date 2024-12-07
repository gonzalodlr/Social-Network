/** @format */

import React from "react";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("StartScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
    </Background>
  );
}
