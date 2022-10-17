import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import Swiper from "react-native-swiper";
import { userGames } from "../../mock-data/MockGamesList";
import { users } from "../../mock-data/mock-user-data";

let games = userGames.map((game) => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center" }}
      key={game.title}
    >
      <Image
        source={{ uri: game.image }}
        style={{
          height: 325,
          width: 250,
          marginBottom: 10,
          borderWidth: 2,
          borderColor: "#3AE456",
          borderRadius: 20,
        }}
      ></Image>
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 30,
          width: 110,
          borderWidth: 2,
          borderColor: "#3AE456",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Form a Squad</Text>
      </Pressable>
    </View>
  );
});

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SquadFinder</Text>
      <View style={styles.info}>
        <Text style={styles.userInfo}>{users[0].gamertag}</Text>
        <Text style={styles.userInfo}>{users[0].preferredPlatform}</Text>
      </View>
      <Text style={styles.userInfo}>My Games:</Text>
      <Swiper style={styles.swiper} showsButtons={true} showsPagination={false}>
        {games}
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
    backgroundColor: "#352540",
    alignItems: "center",
  },
  header: {
    height: 55,
    width: "100%",
    fontSize: 35,
    backgroundColor: "#483F6D",
    color: "#3AE456",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    height: 100,
    backgroundColor: "#483F6D",
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3AE456",
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 10,
  },
  userInfo: {
    color: "#fff",
    marginTop: 5,
    fontSize: 20,
  },
  swiper: {},
  formSquadButton: {
    borderWidth: 3,
    borderColor: "#3AE456",
    borderRadius: 20,
  },
  editButton: {},
  rawg: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
