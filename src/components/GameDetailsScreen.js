import React from "react";
import { View, ScrollView, Image, StyleSheet, Text } from "react-native";

import gameDetails from "../../mock-data/gameDetails";
import formatDescription from "../utilities/formatDescription";

const GameDetailsScreen = () => {
  const { title, image, genres, consoles, description } = gameDetails;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={{ width: "100%", height: 170 }} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.genreContainer}>
        {genres.map((genre) => (
          <View style={styles.genreView} key={genre}>
            <Text style={styles.genre}>{genre}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#201626",
    height: "100%",
    alignItems: "center",
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
  descriptionContainer: {
    backgroundColor: "#393051",
    width: "90%",
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  description: {
    color: "#fff",
    padding: 20,
    fontSize: 15,
    textAlign: "center",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    marginTop: 5,
  },
  genreView: {
    backgroundColor: "#5462A4",
    margin: 5,
    padding: 5,
    borderRadius: 20,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  genre: {
    color: "#fff",
    fontSize: 15
  }
});

export default GameDetailsScreen;
