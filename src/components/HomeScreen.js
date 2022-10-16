import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Swiper from 'react-native-swiper';

import NavMenu from "./NavMenu";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SquadFinder</Text>
      <View style={styles.info}>
        <Text>gamertag</Text>
        <Text>preferred platform</Text>
        <Text>My Games:</Text>
      </View>
      <Swiper style={styles.swiper} showsButtons={true}>
        <View>
          <Text style={styles.slide1}>Slide1</Text>
          <Button
            title="Form a Squad"
          />
        </View>
        <View>
          <Text style={styles.slide2}>Slide2</Text>
          <Button
            title="Form a Squad"
          />
        </View>
      </Swiper>
      <StatusBar style="auto" />
      <Button
        title="Edit My Games"
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
  },
  header: {
    height: 55,
    width: '100%',
    fontSize: 35,
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
  },
  info: {
    height: 150,
    backgroundColor: '#3AE456',
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  swiper: {},
  slide1: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
});

export default HomeScreen;
