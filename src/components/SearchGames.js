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


const SearchGames = ({ games, userGames, addGame, removeGame }) => {
  const [displayedGames, setDisplayedGames] = useState(games); // <--- useEffect to fetch all games and set this state
  const [myGames, setMyGames] = useState([])
  const [searchInput, setSearchInput] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showGames, setShowGames] = useState(false);
  
  const dropdownRef = useRef({}); // <--- needed to reset the genre dropdown

  useEffect(() => {
    setMyGames(userGames)
  }, [])
  
  const inputHandler = (enteredText) => {
    setSearchInput(enteredText);
  };

  const genreHandler = (genre) => {
    setSelectedGenre(genre);
  };

  const searchHandler = () => {
    let theGames;
    selectedGenre && selectedGenre !== "All genres"
      ? (theGames = games.filter((game) => game.genres.includes(selectedGenre)))
      : (theGames = games);
    let filteredGames;
    searchInput && searchInput !== ""
      ? (filteredGames = theGames.filter((game) =>
          game.title.toLowerCase().includes(searchInput.toLowerCase())
        ))
      : (filteredGames = theGames);
    setDisplayedGames(filteredGames);
    setShowGames(true);
  };

  const clearResults = () => {
    setShowGames(false);
    setSearchInput(null);
    setSelectedGenre(null);
    dropdownRef.current.reset();
  };

  const iconClickHandler = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  let genres = [
    // Will be replaced with all the genres of all the games.
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
        <Text style={{ fontSize: 20 }}>Search</Text>
      </Pressable>
      {showGames ? (
        <View style={styles.gamesContainer}>
          <FlatList
            data={displayedGames.sort(
              (a, b) => a.title.charAt(0) - b.title.charAt(0)
            )}
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
                    source={{ uri: `${itemData.item.image_url}` }}
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
    backgroundColor: "#352540",
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
    backgroundColor: "#483F6D",
    height: 35,
    marginTop: 5,
  },
  searchButton: {
    width: 100,
    height: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#3AE456",
    backgroundColor: "#483F6D",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
});

export default SearchGames;
