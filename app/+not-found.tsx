/** @format */

import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Image } from "react-native";

const logo = require("@/assets/images/react-logo.png");

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <ThemedText type="title" style={styles.title}>
          This screen doesn't exist.
        </ThemedText>
        <ThemedText style={styles.errorText}>
          Sorry we couldn't find what you were looking for.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "lightgray",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: "#007bff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    //color: "#6c757d",
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#000",
  },
});
