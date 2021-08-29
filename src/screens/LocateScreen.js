import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Call from "../components/Call";
import Trackee from "../components/Trackee";
import Tracker from "../components/Tracker";
/* import Map from "../components/Tracker"; */

const LocateScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../img/pinkpal.png")} />
      <Tracker /> 
        
        <Trackee />
        <Call />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: "center",
  },
  img: {
    height: 70,
    width: 100,
  },
  txt: {
    color: '#d41568',
    fontSize: 20,
    marginLeft: 60,
    marginRight: 40,
  }
});

export default LocateScreen;
