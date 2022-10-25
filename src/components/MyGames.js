import React, { useState, useEffect } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import GameDetailsScreen from "./GameDetailsScreen";
import { StyleSheet, View, Pressable, Image, Modal, Text } from "react-native";
import LoadingModal from "./LoadingModal";
import { sortGames } from "../utility-functions";

const MyGames = ({ userGames, addGame, removeGame, userID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [displayedGames, setDisplayedGames] = useState(userGames);

  const inputHandler = (enteredText) => {
    setSearchInput(enteredText);
    setDisplayedGames(
      userGames.filter((game) =>
        game.game_title.toLowerCase().includes(enteredText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setDisplayedGames(sortGames(userGames));
  }, [userGames]);

  const iconClickHandler = (game) => {
    fetch(
      `https://squadfinder2205be.herokuapp.com/api/v1/games/${game.game_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedGame(data);
      });
    setModalVisible(true);
    setSelectedGame(null);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {selectedGame ? (
          <GameDetailsScreen
            game={selectedGame}
            userGames={userGames}
            addGame={addGame}
            removeGame={removeGame}
            setModalVisible={setModalVisible}
            userID={userID}
          />
        ) : (
          <LoadingModal />
        )}
      </Modal>
      <TextInput
        testID="search-bar"
        placeholder="Search by title..."
        placeholderTextColor="grey"
        value={searchInput}
        onChangeText={inputHandler}
        style={styles.textInput}
      />
      <View style={styles.gamesContainer}>
        <FlatList
          data={displayedGames}
          numColumns={2}
          contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
          renderItem={(itemData) => {
            return (
              <Pressable
                title="User's Game"
                style={styles.gameIcon}
                onPress={() => iconClickHandler(itemData.item)}
              >
                <Image
                  testID={`users-game-icon-${itemData.item.id}`}
                  source={{ uri: `${itemData.item.image_url}` }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    borderWidth: 2,
                    bottom: 0,
                  }}
                ></Image>
                <Text style={styles.gameTitle}>{itemData.item.game_title}</Text>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
      <Text style={styles.rawg}>Powered by RAWG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201626",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    width: 250,
    height: 35,
    color: "white",
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderRadius: 5,
    borderColor: "#3AE456",
    padding: 5,
    margin: 15,
  },
  gamesContainer: {
    borderColor: "#5462A4",
    borderTopWidth: 1,
    width: "100%",
    height: "85%",
  },
  gameIcon: {
    height: 200,
    width: 170,
    justifyContent: "center",
    textAlign: "center",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3AE456",
    margin: 10,
  },
  rawg: {
    height: "5%",
    margin: 10,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
  },
  gameTitle: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,.6)",
    overflow: "hidden",
  },
});

export default MyGames;
