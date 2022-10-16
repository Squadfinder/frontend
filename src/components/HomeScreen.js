import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

import NavMenu from "./NavMenu";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text class="test">Let's find us a SQUAD!</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default HomeScreen;
