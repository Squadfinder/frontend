import { searchFetch } from "../apiCalls";
import React, { useState, useRef } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import LoadingModal from "./LoadingModal";
import GameDetailsScreen from "./GameDetailsScreen";
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  Image,
  Modal,
  Text,
} from "react-native";

const SearchGames = ({ userGames, addGame, removeGame }) => {
  const [displayedGames, setDisplayedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [error, setError] = useState(false);

  const dropdownRef = useRef({});

  const inputHandler = (enteredText) => {
    setSearchInput(enteredText);
  };

  const genreHandler = (genre) => {
    setSelectedGenre(genre);
  };

  const searchHandler = () => {
    if (searchInput !== "") {
      searchFetch(searchInput).then((data) => {
        if (selectedGenre !== "") {
          const filteredByGenre = data.filter((game) =>
            game.genres.includes(selectedGenre)
          );
          setDisplayedGames(filteredByGenre);
        } else {
          setDisplayedGames(data);
        }
      });
      setShowGames(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const clearResults = () => {
    setShowGames(false);
    setSearchInput("");
    setSelectedGenre("");
    dropdownRef.current.reset();
  };

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

  const genres = [
    "Action",
    "Adventure",
    "Fantasy",
    "Shooter",
    "RPG",
    "Strategy",
    "Board Games",
    "Card",
    "Indie",
    "Arcade",
    "Casual",
    "Platformer",
    "Sports",
    "Racing",
    "Simulation",
    "Massively Multiplayer",
    "Puzzle",
    "Racing"
  ];

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
            myGames={userGames}
            addGame={addGame}
            removeGame={removeGame}
            setModalVisible={setModalVisible}
          />
        ) : (
          <LoadingModal />
        )}
      </Modal>
      <TextInput
        placeholder="Search by title..."
        placeholderTextColor="grey"
        value={searchInput}
        onChangeText={inputHandler}
        style={styles.textInput}
      />
      {error && (
        <Text style={{ margin: -5, color: "red" }}>
          * You must enter a title
        </Text>
      )}
      <SelectDropdown
        data={genres.sort()}
        search={true}
        searchPlaceHolder="Search..."
        buttonStyle={styles.selectListBox}
        buttonTextStyle={{ color: "#3AE456" }}
        rowStyle={{ backgroundColor: "#352540" }}
        rowTextStyle={{ color: "#3AE456" }}
        searchInputStyle={{ backgroundColor: "#393051" }}
        searchInputTxtColor="#3AE456"
        dropdownStyle={{ backgroundColor: "#393051" }}
        defaultButtonText="Select a genre..."
        ref={dropdownRef}
        onSelect={(genre) => genreHandler(genre)}
      />
      <Pressable style={styles.searchButton} onPress={() => searchHandler()}>
        <Text style={{ fontSize: 20, color: "#3AE456" }}>Search</Text>
      </Pressable>
      {showGames ? (
        <View style={styles.gamesContainer}>
          <FlatList
            data={displayedGames}
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
      ) : (
        <View style={{ flex: 5 / 6 }}></View>
      )}
      <Button title="Clear Results" onPress={() => clearResults()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201626",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textInput: {
    flex: 1 / 24,
    borderWidth: 2,
    width: 250,
    height: 30,
    color: "white",
    borderRadius: 5,
    borderColor: "#3AE456",
    padding: 5,
    marginTop: 10,
    marginBottom: 0,
  },
  gamesContainer: {
    flex: 20 / 24,
  },
  gameIcon: {
    height: 200,
    width: 170,
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    margin: 12,
  },
  selectListBox: {
    borderWidth: 2,
    borderColor: "#3AE456",
    borderRadius: 20,
    backgroundColor: "#393051",
    height: 35,
    marginTop: 5,
  },
  searchButton: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#3AE456",
    backgroundColor: "#393051",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
});

export default SearchGames;
