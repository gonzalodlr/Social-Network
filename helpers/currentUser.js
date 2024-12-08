/** @format */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const getCurrentUser = async () => {
  let nombre = "";
  if (isWeb) {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      nombre = parsedUser.name;
    }
  } else {
    try {
      const user = await AsyncStorage.getItem("currentUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        nombre = parsedUser.name;
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
    }
  }
  return nombre;
};
