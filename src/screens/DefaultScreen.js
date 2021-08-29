import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import ButtonA from "../components/ButtonA";
import * as firebase from "firebase";
import { Permissions, Notifications } from "expo";

const DefaultScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const userID = firebase.auth().currentUser.uid;
  console.log(userID);
  console.log(firebase.auth().currentUser.email);
  console.log(firebase.auth().currentUser.displayName);
  console.log(firebase.auth().currentUser.name);

  firebase
    .database()
    .ref("users/" + userID)
    .set({
      Name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
    });

  return (
    <ScrollView>
      <TouchableOpacity onPress={signOutUser}>
        <MaterialIcons name="account-circle" size={90} color="black" />
      </TouchableOpacity>
      <View style={styles.View}>
        <Image style={styles.imge} source={require("../img/pinkpal.png")} />
        <Text style={styles.txt}>
          For emergency press the help button below
        </Text>

        <ButtonA
          style={styles.Button}
          title="Help"
          onPress={() => navigation.navigate("Search")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  View: {
    flexDirection: "column",
    alignItems: "center",
  },
  txt: {
    color: "#d41568",
    fontWeight: "bold",
    fontSize: 30,
    padding: 30,
  },
  Button: {
    height: 100,
    width: 280,
    marginTop: "15%",
    backgroundColor: "#d41568",
    fontSize: 40,
    borderRadius: 10,
  },
});

export default DefaultScreen;
