import React, { useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { sortGames } from "../utility-functions";

const LoginScreen = ({ allUsers, setCurrentUser, setUserGames }) => {
  const dropdownRef = useRef({});
  const navigation = useNavigation();

  const allUserNames = allUsers.map((user) => user.attributes.gamertag);

  const handleSelect = (profile) => {
    const matchedUser = allUsers.find(
      (user) => user.attributes.gamertag === profile
    );
    setCurrentUser(matchedUser);
    setUserGames(sortGames(matchedUser.attributes.user_games));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SquadFinder</Text>
      <SelectDropdown
        data={allUserNames}
        buttonStyle={styles.selectListBox}
        buttonTextStyle={{ color: "#3AE456" }}
        rowStyle={{ backgroundColor: "#352540" }}
        rowTextStyle={{ color: "#3AE456" }}
        searchInputStyle={styles.selectListBox}
        searchInputTxtColor="#3AE456"
        dropdownStyle={styles.selectListDropdown}
        defaultButtonText="Select a Profile"
        ref={dropdownRef}
        onSelect={(profile) => handleSelect(profile)}
      />
      <Text style={styles.welcomePrompt}>
        {" "}
        Welcome to SquadFinder! Start by selecting a profile, look through the
        games on your profile, and start a search for any new game that you want
        to add.
      </Text>
      <Text style={styles.welcomePrompt}>
        {" "}
        Once you have found the game you want to play, invite some other gamers
        to a squad, and view all of your past or upcoming squads!
      </Text>
      <Text style={styles.welcomePrompt}>Happy gaming!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201626",
    alignItems: "center",
  },
  header: {
    height: "8%",
    width: "100%",
    fontSize: 35,
    backgroundColor: "#483F6D",
    color: "#3AE456",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
  },
  welcomePrompt: {
    width: "85%",
    color: "#3AE456",
    fontSize: 20,
    textAlign: "center",
    margin: 30,
  },
  selectListBox: {
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    backgroundColor: "#393051",
    height: 45,
    marginTop: 25,
  },
  selectListDropdown: {
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 2,
    backgroundColor: "#393051",
  },
});

export default LoginScreen;
