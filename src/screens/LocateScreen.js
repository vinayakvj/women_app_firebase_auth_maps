import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Call from "../components/Call";
/* import Map from "../components/Tracker"; */

const LocateScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../img/pinkpal.png")} />
      {/* <Map /> */}
      <Text style={styles.txt}>
        Your location has been tracked by the police and nearest volunteers.
        Help is on the way
      </Text>
      <View style={styles.call}>
        <Call />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  img: {
    height: 70,
    width: 100,
  },
  txt: {
    color: "#b80646",
    fontSize: 20,
    marginLeft: 60,
    marginRight: 40,
  },
  call: {
    marginTop: 180,
  },
});

export default LocateScreen;
