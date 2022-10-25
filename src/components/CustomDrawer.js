import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: "#352540",
        flex: 1,
      }}
    >
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
});

export default CustomDrawer;
