import React from "react";
import { View, ScrollView, Image, StyleSheet, Text, Pressable } from "react-native";

import gameDetails from "../../mock-data/gameDetails";

const GameDetailsScreen = () => {
  const { title, image, genres, consoles } = gameDetails;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={{ width: "100%", height: 170 }} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.genreContainer}>
        {genres.map((genre) => (
          <View style={styles.genreView} key={genre}>
            <Text style={styles.genre}>{genre}</Text>
          </View>
        ))}
      </View>
      <View style={styles.consoleContainer}>
        {consoles.map((console) => (
          <View style={styles.consoleView} key={console}>
            <Text style={styles.console}>{console}</Text>
          </View>
        ))}
      </View>
      <View style={styles.favoriteBtnContainer}>
        <Pressable style={styles.favoriteBtn}>
          <Text style={styles.favoriteBtnText}>Favorite Game</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#201626",
    alignItems: "center",
    minHeight: "100%",
  },
  imageContainer: {
    backgroundColor: "#352540",
    width: "90%",
    marginTop: 50,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 20,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  titleContainer: {
    backgroundColor: "#393051",
    width: "90%",
    marginTop: 10,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3AE456",
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 40,
  },
  title: {
    color: "#fff",
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    marginTop: 15,
  },
  genreView: {
    backgroundColor: "#5462A4",
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 20,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  genre: {
    color: "#fff",
    fontSize: 15,
  },
  consoleContainer: {
    backgroundColor: "#393051",
    width: "90%",
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 30,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 40,
  },
  consoleView: {
    backgroundColor: "#000",
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3AE456",
  },
  console: {
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 8,
    paddingLeft: 8,
  },
  favoriteBtnContainer: {
    marginTop: "auto",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#000",
    width: "100%",
    justifyContent: "space-between",
  },
  favoriteBtn: {
    backgroundColor: "#393051",
    alignSelf: "flex-end",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "5%",
    borderRadius: 30,
  },
  favoriteBtnText: {
    color: "#3AE456",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight:20,
  },
});

export default GameDetailsScreen;
