import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = () => {
  return (
    <View>
      <ListItem>
        <Avatar
          source={{
            uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
          }}
        />
      </ListItem>
    </View>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
