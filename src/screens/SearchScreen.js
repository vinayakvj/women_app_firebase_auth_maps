import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import ButtonA from "../components/ButtonA";

const SearchScreen = ({ navigation }) => {
  /*   var [count, setCount] = useState(10); */

  /* useEffect(() => {
    setInterval(() => {
      if (count <= 0) {
        setCount(0);
        setCount(10);
        navigation.navigate("Locate");
      } else {
        setCount((count = count - 1));
      }
    }, 1000);
    return () => {
      console.log("cleanup cleanup");
    };
  }, [navigation]); */

  var [count, setCount] = useState(10);

  useEffect(() => {
    count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  if (count === 0) {
    navigation.navigate("Locate");
  }

  return (
    <>
      <Image style={styles.img} source={require("../img/pinkpal.png")} />
      <View style={styles.View}>
        <Text style={styles.txt}>
          You are being connected to nearest police station.
        </Text>
        <ActivityIndicator size="large" color="#d41568" />
        <Text style={styles.txt2}>
          If Help was pressed wrongly you can cancel within {count} seconds
        </Text>
        <ButtonA
          style={styles.Button}
          title="Cancel"
          onPress={() => {
            setCount(10);
            navigation.navigate("Default");
          }}
        />
        <ButtonA
          style={styles.Button}
          title="Confirm"
          onPress={() => navigation.navigate("Locate")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    marginLeft: "8%",
    height: "28%",
  },
  txt: {
    color: "#d41568",
    fontSize: 20,
    padding: "10%",
    backgroundColor: "transparent",
  },
  txt2: {
    color: "#d41568",
    fontSize: 20,
    padding: "8%",
  },
  View: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    marginTop: "38%",
  },
  Button: {
    height: 80,
    width: 280,
    marginTop: "4%",
    backgroundColor: "#d41568",
    fontSize: 40,
    borderRadius: 10,
  },
});

export default SearchScreen;
