import React, { useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { userGames } from "../../mock-data/MockGamesList";
import { StyleSheet, View, Button, Pressable, Image } from "react-native";
import SelectList from "react-native-dropdown-select-list";

const SearchGames = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [displayedGames, setDisplayedGames] = useState(userGames); // <--- useEffect to fetch all games and set this state
  const [selected, setSelected] = useState("");

  const inputHandler = (enteredText) => {
    setSearchInput(enteredText);
    const filteredGames = userGames.filter((game) =>
      game.title.toLowerCase().includes(enteredText.toLowerCase())
    );
    if (enteredText === "") {
      setDisplayedGames(userGames);
    } else {
      setDisplayedGames(filteredGames);
    }
  };

  let genres = ["Shooter", "RPG"];

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title..."
        placeholderTextColor="grey"
        value={searchInput}
        onChangeText={inputHandler}
        style={styles.textInput}
      />
      <SelectList
        data={genres}
        setSelected={setSelected}
        boxStyles={styles.selectListBox}
      />
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
                onPress={() => navigation.navigate("Home")}
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
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
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
    borderColor: "#5462A4",
    borderWidth: 1,
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
    color: "#3AE456",
    height: 50,
    marginTop: 5,
  },
});

export default SearchGames;
