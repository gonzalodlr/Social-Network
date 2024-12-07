/** @format */
import Main from "../components/Main";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
