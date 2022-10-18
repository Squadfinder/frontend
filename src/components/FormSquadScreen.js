import React, { useState } from "react";
import { View, Platform, Pressable, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import { users } from "../../mock-data/mock-user-data";
import { FlatList } from "react-native-gesture-handler";

const FormSquadScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showing, setShowing] = useState(false);
  const [selected, setSelected] = useState("");
  const [filterUsers, setFilterUsers] = useState(users);

  const onChange = (event, selectedDate) => {
    if (event.type !== "dismissed") {
      const currentDate = selectedDate;
      if (Platform.OS === "android") {
        setShowing(false);
      }
      setDate(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShowing(true);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const handleSelectGame = (selectedGame) => {
    setSelected(selectedGame);
    filterUsersByGame(selectedGame);
  }

  const filterUsersByGame = (selectedGame) => {
    const filteredUsers = users.reduce((arr, user) => {
        const usersWithGame = user.gamesList.filter(game => game.title === selectedGame);
        if (usersWithGame.length) {
            arr.push(user)
        }
        return arr;
    }, []);
    setFilterUsers(filteredUsers)
  }

  return (
    <View>
      <SelectList
        // date will most likely need to be refactored after we have API date
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
      <View>
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
      </View>
    </View>
  );
};

export default FormSquadScreen;
