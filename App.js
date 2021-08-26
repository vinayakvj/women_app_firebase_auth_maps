import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DefaultScreen from "./src/screens/DefaultScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LocateScreen from "./src/screens/LocateScreen";

/* const firebaseConfig = {
  apiKey: "AIzaSyDu7rZiXHVowDwwkKl8uE3tJlr_bSC-hNg",
  authDomain: "womens-app.firebaseapp.com",
  projectId: "womens-app",
  storageBucket: "womens-app.appspot.com",
  messagingSenderId: "373808914725",
  appId: "1:373808914725:web:59d0e80dfb6807cafdbacc",
  measurementId: "G-V91ZXWK31Q",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
 */
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#2C6BED",
  },
  headerTitleStyle: {
    color: "white",
  },
  headerTintColor: "white",
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Default" component={DefaultScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Locate" component={LocateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/* import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
 */
