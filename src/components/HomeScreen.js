import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Swiper from 'react-native-swiper';
import { games } from '../../mock-data/mock-game-data';

import NavMenu from "./NavMenu";

let userGames = games.map(game => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={{uri: game.image}}
        style={{height: 325, width: 250, borderWidth: 5, borderColor: 'black', borderRadius: 20}}>
      </Image>
      <Button
        title='Form a Squad'
      />
    </View>
  )
})

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
        {userGames}
      </Swiper>
      <Button
        style={styles.editButton}
        title="Edit My Games"
        onPress={() => navigation.navigate("Profile")}
      />
      <Text style={styles.rawg}>Powered by RAWG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393051",
    alignItems: "center",
  },
  header: {
    height: 55,
    width: '100%',
    fontSize: 35,
    backgroundColor: '#483F6D',
    color: '#3AE456',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    height: 150,
    backgroundColor: '#483F6D',
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3AE456',
    borderWidth: 5,
    borderRadius: 50,
    marginBottom: 10,
  },
  swiper: {},
  editButton: {},
  rawg: {
    marginTop: 10,
    marginBottom: 10,
  }
});

export default HomeScreen;
