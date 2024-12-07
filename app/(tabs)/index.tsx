/** @format */

import React from "react";
import { Provider } from "react-native-paper";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "../../core/theme";
import {
  Load,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from "../../screens";
import Main from "@/components/Main";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <SafeAreaProvider>
        <NavigationIndependentTree>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Load"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Load" component={Load} />
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="HomeScreen" component={Main} />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NavigationIndependentTree>
      </SafeAreaProvider>
    </Provider>
  );
}
