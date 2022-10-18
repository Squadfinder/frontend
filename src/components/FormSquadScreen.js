import React, { useState } from "react";
import { View, Platform, Pressable, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import { users } from "../../mock-data/mock-user-data";
import { FlatList, TextInput } from "react-native-gesture-handler";

const FormSquadScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date"); // Toggles the calender modal between date / time
  const [showing, setShowing] = useState(false); // Toggles calender modal view on / off
  const [selected, setSelected] = useState(""); // Selected Game
  const [filterUsers, setFilterUsers] = useState(users); // Starts at all users, and is filtered base off game option and user filter by gamertag
  const [filterByNameValue, setFilterByNameValue] = useState(""); // Filter by gamertag parameter 

  const onChange = (event, selectedDate) => { // this function sets date / time selection. Both date and time update the same value
    if (event.type !== "dismissed") {
      const currentDate = selectedDate;
      if (Platform.OS === "android") { // set to android only b/c iOS will cose the model on any button click
        setShowing(false);
      }
      setDate(currentDate);
    }
  };

  const showMode = (currentMode) => { // function that open modal
    setMode(currentMode);
    setShowing(true);
  };

  const showDatePicker = () => { // sets current type of modal, date 
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const handleSelectGame = (selectedGame) => { // sets current type of modal, time
    setSelected(selectedGame);
    filterUsersByGame(selectedGame);
  };

  const filterUsersByGame = (selectedGame) => {
    const filteredUsers = filterUsers.reduce((arr, user) => { // I don't know a way to do this w/o nesting the iterators
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

  return (
    <View>
      <SelectList
        // users[1] will most likely need to be refactored after we have API user(s)
        data={users[1].gamesList.map((game) => game.title)}
        value={selected}
        setSelected={(selectedGame) => handleSelectGame(selectedGame)}
        // boxStyles={styles.selectListBox}
      />
      <Pressable onPress={showDatePicker}>
        <Text>Choose Date</Text>
      </Pressable>
      <Pressable onPress={showTimePicker}>
        <Text>Choose Time</Text>
      </Pressable>
      <Text>
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
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            minimumDate={new Date()}
            textColor="#3AE456"
            accentColor="#3AE456"
          />
        )}
      </View>
      <TextInput
        value={filterByNameValue}
        onChangeText={(input) => filterUserByName(input)}
        placeholder="Filter Users by Name"
        placeholderTextColor="grey"
      />
      <View>
        {filterUsers.length ? (
          <FlatList
            data={filterUsers}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.gamertag}</Text>
                  <Pressable>
                    <Text>Invite</Text>
                  </Pressable>
                </View>
              );
            }}
          />
        ) : (
          <Text>Sorry, there are no users with this Gamer Tag.</Text>
        )}
      </View>
      <Pressable>
        <Text>FORM SQUAD!</Text>
      </Pressable>
    </View>
  );
};

export default FormSquadScreen;
