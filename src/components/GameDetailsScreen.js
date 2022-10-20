import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

const GameDetailsScreen = ({ game, myGames, addGame, removeGame, setModalVisible }) => {
  const [hasGame, setHasGame] = useState(false);
  const { title, image, genres, consoles } = game;
  
  useEffect(() => {
    console.log(myGames)
    if (myGames.find((element) => element.game_title === game.title) !== undefined) {
      setHasGame(true);
    }
  }, []);

  console.log(hasGame)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={{ width: "100%", height: 320 }} />
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
      <Pressable style={styles.closeModalBtn}>
        <Text style={styles.closeModalTxt} onPress={() => setModalVisible(false)}>Close</Text>
      </Pressable>
      {!hasGame ? (
        <View style={styles.favoriteBtnContainer}>
          <Pressable style={styles.favoriteBtn} onPress={() => addGame(game)}>
            <Text style={styles.favoriteBtnText}>Favorite Game</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.favoriteBtnContainer}>
          <Pressable style={styles.favoriteBtn} onPress={() => removeGame(game)}>
            <Text style={styles.favoriteBtnText}>Remove Game</Text>
          </Pressable>
        </View>
      )}
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
    marginTop: 20,
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
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    marginTop: 20,
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
    marginTop: 20,
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
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: 30,
  },
  closeModalBtn: {
    backgroundColor: "#3AE456",
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
  closeModalTxt: {
    fontWeight: "bold"
  },
  favoriteBtnText: {
    color: "#3AE456",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default GameDetailsScreen;
