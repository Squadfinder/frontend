
import { searchFetch } from "../apiCalls"
import React, { useState, useRef, useEffect } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
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
  const [displayedGames, setDisplayedGames] = useState(null);
  const [myGames, setMyGames] = useState(userGames)
  const [searchInput, setSearchInput] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showGames, setShowGames] = useState(false);
  
  const dropdownRef = useRef({});
  
  const inputHandler = (enteredText) => {
    setSearchInput(enteredText);
  };

  const genreHandler = (genre) => {
    setSelectedGenre(genre);
  };

  const searchHandler = () => {
    searchFetch(searchInput, selectedGenre)
    .then(data => setDisplayedGames(data))
    setShowGames(true);
  };

  const clearResults = () => {
    setShowGames(false);
    setSearchInput(null);
    setSelectedGenre(null);
    dropdownRef.current.reset();
  };

  const iconClickHandler = (game) => {
    fetch(
      `https://squadfinder2205be.herokuapp.com/api/v1/games/${game.game_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedGame(data);
      })
      .then(() => setModalVisible(true));
  };

  let genres = [
    "All genres",
    "Action-adventure",
    "Fantasy",
    "First-Person Shooter",
    "Second-Person Shooter",
    "Third-Person Shooter",
    "Fourth-Person Shooter",
    "Fifth-Person Shooter",
    "Infinity-Person Shooter",
    "RPG",
    "Person-Shooter",
    "Piloting",
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
        <GameDetailsScreen
          game={selectedGame}
          myGames={myGames}
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
      <SelectDropdown
        data={genres}
        search={true}
        searchPlaceHolder="Search..."
        buttonStyle={styles.selectListBox}
        buttonTextStyle={{ color: '#3AE456' }}
        rowStyle={{ backgroundColor: "#352540" }}
        rowTextStyle={{ color: "#3AE456" }}
        searchInputStyle={styles.selectListBox}
        searchInputTxtColor="#3AE456"
        dropdownStyle={styles.selectListDropdown}
        defaultButtonText="Select a genre..."
        ref={dropdownRef}
        onSelect={(genre) => genreHandler(genre)}
      />
      <Pressable style={styles.searchButton} onPress={() => searchHandler()}>
        <Text style={{ fontSize: 20, color: '#3AE456' }}>Search</Text>
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
                      borderWidth: 2,
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
      <Pressable style={styles.clearButton} onPress={() => clearResults()}>
        <Text style={{color: "#fff"}}>Clear Results</Text>
      </Pressable>
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
    borderWidth: 1,
    width: 250,
    height: 30,
    color: "white",
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderRadius: 5,
    borderColor: "#3AE456",
    padding: 5,
    marginTop: 10,
    marginBottom: 0,
  },
  gamesContainer: {
    flex: 20 / 24,
    borderTopWidth: 1,
    width: "100%",
    borderColor: "#5462A4",
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
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    margin: 10,
  },
  selectListBox: {
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    backgroundColor: "#393051",
    height: 35,
    marginTop: 5,
  },
  selectListDropdown: {
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 2,
    backgroundColor: "#393051",
  },
  searchButton: {
    width: 100,
    height: 30,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    backgroundColor: "#393051",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    width: 100,
    height: 30,
    marginBottom: 20,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    backgroundColor: "#393051",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default SearchGames;
