import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { set } from "react-native-reanimated";
import { auth } from "../../firebase";
import { userCred } from "../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [credentials, setCredentials] = useState({
    name: "",
    number: "",
    email: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a PinkPal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => {
            setCredentials({ ...credentials, name: text });
            setName(text);
          }}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => {
            setCredentials({ ...credentials, email: text });
            setEmail(text);
          }}
        />
        <Input
          placeholder="Phone Number"
          type="text"
          value={phone}
          onChangeText={(text) => {
            setCredentials({ ...credentials, number: text });
            setPhone(text);
          }}
          onSubmitEditing={register}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        containerStyle={styles.button}
        title="Register"
        onPress={() => {
          register();
          userCred(credentials);
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

export default RegisterScreen;
