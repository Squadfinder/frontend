import React, { useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import GameDetailsScreen from "./GameDetailsScreen";
import { StyleSheet, View, Pressable, Image, Modal } from "react-native";

const MyGames = ({ userGames, addGame, removeGame }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [games, setGames] = useState(userGames);
  // myGames will be set to the user's gameList, which I assume
  // will be passed from props or fetched with useEffect.

  const inputHandler = (enteredText) => {
    setSearchInput(enteredText);
    const filteredGames = userGames.filter((game) =>
      game.title.toLowerCase().includes(enteredText.toLowerCase())
    );
    enteredText === "" ? setGames(userGames) : setGames(filteredGames);
  };

  const iconClickHandler = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
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
        <GameDetailsScreen
          game={selectedGame}
          myGames={userGames}
          addGame={addGame}
          removeGame={removeGame}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <TextInput
        placeholder="Search by title..."
        placeholderTextColor="grey"
        value={searchInput}
        onChangeText={inputHandler}
        style={styles.textInput}
      />
      <View style={styles.gamesContainer}>
        <FlatList
          data={games}
          numColumns={2}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={(itemData) => {
            return (
              <Pressable
                title="User's Game"
                style={styles.gameIcon}
                onPress={() => iconClickHandler(itemData.item)}
              >
                <Image
                  source={{ uri: `${itemData.item.image}` }}
                  resizeMode="stretch"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderWidth: 1,
                    borderRadius: 20,
                    bottom: 0,
                  }}
                ></Image>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#352540",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textInput: {
    borderWidth: 2,
    width: 250,
    height: 30,
    color: "white",
    borderRadius: 5,
    borderColor: "#3AE456",
    padding: 5,
  },
  gamesContainer: {
    borderColor: "#5462A4",
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    height: "80%",
  },
  gameIcon: {
    height: 200,
    width: 170,
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    margin: 5,
  },
});

export default MyGames;
