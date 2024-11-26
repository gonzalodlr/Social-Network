/** @format */

import React from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, Modal } from "react-native";
import { router } from "expo-router";

const logo = require("@/assets/images/logo.png");

const InitialLoad = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Modal visible={true} animationType="fade">
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default InitialLoad;
