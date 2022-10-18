import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { users } from "../../mock-data/mock-user-data";
import { FlatList, TextInput } from "react-native-gesture-handler";

const FormSquadScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date"); // Toggles the calender modal between date / time
  const [showing, setShowing] = useState(false); // Toggles calender modal view on / off
  const [selected, setSelected] = useState(""); // Selected Game
  const [filterUsers, setFilterUsers] = useState(users); // Starts at all users, and is filtered base off game option and user filter by gamertag
  const [filterByNameValue, setFilterByNameValue] = useState(""); // Filter by gamertag parameter
  const [squadMembers, setSquadMembers] = useState([]);
  const [squadFull, setSquadFull] = useState(false);

  const showMode = (currentMode) => {
    // function that open modal
    setMode(currentMode);
    setShowing(true);
  };

  const showDatePicker = () => {
    // sets current type of modal, date
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const handleSelectGame = (selectedGame) => {
    // sets current type of modal, time
    setSelected(selectedGame);
    filterUsersByGame(selectedGame);
  };

  const filterUsersByGame = (selectedGame) => {
    const filteredUsers = filterUsers.reduce((arr, user) => {
      // I don't know a way to do this w/o nesting the iterators
      const usersWithGame = user.gamesList.filter(
        (game) => game.title === selectedGame
      );
      if (usersWithGame.length) {
        arr.push(user);
      }
      return arr;
    }, []);
    setFilterUsers(filteredUsers); // Sets the users being displayed to only ones that play selected game
  };

  const filterUserByName = (input) => {
    if (input) {
      setFilterByNameValue(input);
      const filteredUsers = filterUsers.filter((user) =>
        user.gamertag.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      );
      setFilterUsers(filteredUsers); // sets displayed users to only ones with gamer tags matching input
    } else {
      setFilterByNameValue("");
      setFilterUsers(users); // if input is empty reset to all users
    }
  };

  const inviteSquadMemberHandler = (id) => {
    if (squadMembers.length > 2) {
      setSquadMembers([...squadMembers, id]);
    } else {
      console.log("Squad is full"); // needs removing and error handling added for when a squad is full
      setSquadFull(true);
    }
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        // users[1] will most likely need to be refactored after we have API user(s)
        data={users[1].gamesList.map((game) => game.title)}
        defaultButtonText="Select Game"
        onSelect={(selectedGame) => handleSelectGame(selectedGame)}
        searchInputTxtColor={{}}
        buttonStyle={styles.selectGameBtnStyle}
        buttonTextStyle={styles.selectGameBtnTextStyle}
        dropdownStyle={styles.selectGameDropdownStyle}
        rowTextStyle={styles.selectGameRowTextStyle}
      />
      <Pressable onPress={showDatePicker} style={styles.chooseDateBtn}>
        <Text style={styles.chooseDateTimeTxt}>Choose Date</Text>
      </Pressable>
      <Pressable onPress={showTimePicker} style={styles.chooseTimeBtn}>
        <Text style={styles.chooseDateTimeTxt}>Choose Time</Text>
      </Pressable>
      <Text style={styles.selectedTimeTxt}>
        {date.getMonth() +
          1 +
          "/" +
          date.getDate() +
          "/" +
          date.getFullYear() +
          " AT " +
          date.getHours() +
          ":" +
          date.getMinutes()}
      </Text>
      <View>
        {showing && (
          <DateTimePicker
            modal={true}
            open={showing}
            value={date}
            mode={mode}
            is24Hour={true}
            locale="en-US"
            minimumDate={new Date()}
            onConfirm={(date) => {
              setDate(date);
              setShowing(false);
            }}
            onCancel={() => {
              setShowing(false);
            }}
            style={styles.datePicker}
          />
        )}
      </View>
      <TextInput
        value={filterByNameValue}
        onChangeText={(input) => filterUserByName(input)}
        placeholder="Filter Users by Name"
        placeholderTextColor="grey"
        style={styles.filterByNameInput}
      />
      <View style={styles.userList}>
        {filterUsers.length ? (
          <FlatList
            data={filterUsers}
            renderItem={({ item }) => {
              return (
                <View style={styles.userContainer}>
                  <Text style={styles.userGamerTag}>{item.gamertag}</Text>
                  <Pressable
                    onPress={() => inviteSquadMemberHandler(item.id)}
                    style={styles.inviteBtn}
                    disabled={!squadFull}
                  >
                    <Text style={styles.inviteText}>Invite</Text>
                  </Pressable>
                </View>
              );
            }}
          />
        ) : (
          <Text>Sorry, there are no users with this Gamer Tag.</Text>
        )}
      </View>
      <Pressable
        style={styles.formSquadBtn}
        disabled={!selected && !squadMembers.length}
      >
        <Text style={styles.formSquadText}>FORM SQUAD!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#352540",
    paddingTop: 50,
    minHeight: "100%",
    alignItems: "center",
  },
  selectGameBtnStyle: {
    width: "90%",
    backgroundColor: "#393051",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 5,
  },
  selectGameBtnTextStyle: {
    color: "#fff",
  },
  selectGameDropdownStyle: {
    backgroundColor: "#5462A4",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 5,
  },
  selectGameRowTextStyle: {
    color: "#201626",
  },
  chooseDateBtn: {
    backgroundColor: "#5462A4",
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  chooseDateTimeTxt: {
    color: "#fff",
    padding: 10,
    fontSize: 17,
  },
  chooseTimeBtn: {
    backgroundColor: "#483F6D",
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  selectedTimeTxt: {
    paddingTop: 10,
    fontSize: 20,
    color: "#3AE456",
  },
  datePicker: {
    width: 130,
    marginTop: 10,
  },
  filterByNameInput: {
    marginTop: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    textAlign: "center",
  },
  userList: {
    backgroundColor: "#393051",
    width: "90%",
    height: "25%",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  formSquadBtn: {
    marginTop: 30,
    backgroundColor: "#483F6D",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3AE456",
    width: "90%",
    alignItems: "center",
  },
  formSquadText: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5462A4",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  userGamerTag: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  inviteBtn: {
    backgroundColor: "#352540",
    marginRight: 30,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3AE456",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  inviteText: {
    color: "#fff",
  },
});

export default FormSquadScreen;