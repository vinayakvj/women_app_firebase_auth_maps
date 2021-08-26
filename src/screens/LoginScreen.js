import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../../firebase";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.navigation.replace("Default");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.inputContainer}>
        <Image style={styles.imge} source={require("../img/pinkpal.png")} />

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={() => {
          props.navigation.navigate("Register");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    width: 200,
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
  },
});

export default LoginScreen;
