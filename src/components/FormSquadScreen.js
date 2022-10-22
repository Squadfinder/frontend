import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { postSquad } from "../apiCalls";

const FormSquadScreen = ({ allUsers, userGames }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showing, setShowing] = useState(false);
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState(allUsers);
  const [filterByNameValue, setFilterByNameValue] = useState("");
  const [squadMembers, setSquadMembers] = useState([]);
  const [competitive, setCompetitive] = useState(false);
  const [squadFull, setSquadFull] = useState(false); // needs full squad error handling

  const navigation = useNavigation();

  const formSquadHandler = () => {
    const squad = {
      id: 1,
      game: selected,
      eventTime: date.toISOString(),
      numberPlayers: squadMembers.length,
      competitive: competitive,
      squadMembers: squadMembers,
    };
    postSquad(squad)
      .then((response) => {
        console.log(response);
        navigation.navigate("My Squads");
      })
      .catch((error) => console.log(error));
  };

  // React Native components don't unmount causing this component not to update when it's navigated to and from,
  // useFocusEffect tells the component to do stuff when the user navigates to of from the screen
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setDate(new Date());
        setFilterByNameValue("");
        setSquadMembers([]);
        setCompetitive(false);
        setSquadFull(false);
      };
    }, [])
  );

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
    setShowing(!showing);
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
  };

  const filterUsersByGame = (selectedGame) => {
    const filteredUsers = allUsers.reduce((arr, user) => {
      const usersWithGame = user.attributes.user_games.filter(
        (game) => game.game_title === selectedGame
      );
      if (usersWithGame.length) {
        arr.push(user);
      }
      return arr;
    }, []);
    setUsers(filteredUsers);
  };

  const filterUserByName = (input) => {
    if (input) {
      setFilterByNameValue(input);
      const filteredUsers = users.filter((user) =>
        user.attributes.gamertag
          .toLocaleLowerCase()
          .includes(input.toLocaleLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setFilterByNameValue("");
      setUsers(allUsers);
    }
  };

  const inviteSquadMemberHandler = (id) => {
    if (squadMembers.length < 3) {
      setSquadMembers([...squadMembers, id]);
    } else {
      console.log("Squad is full");
      setSquadFull(true);
    }
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={userGames.map((game) => game.game_title)}
        defaultButtonText={"Select Game"}
        onSelect={(selectedGame) => handleSelectGame(selectedGame)}
        buttonStyle={styles.selectGameBtnStyle}
        buttonTextStyle={styles.selectGameBtnTextStyle}
        dropdownStyle={styles.selectGameDropdownStyle}
        rowStyle={{ backgroundColor: "#352540"}}
        rowTextStyle={styles.selectGameRowTextStyle}
      />
      <Pressable
        onPress={() => setCompetitive(!competitive)}
        style={styles.competitiveBtn}
      >
        <Text style={styles.competitiveTxt}>
          {competitive ? "Competitive" : "Casual"}
        </Text>
        <View
          style={
            competitive
              ? styles.competitiveBoxCompetitive
              : styles.competitiveBoxCasual
          }
        ></View>
      </Pressable>
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
          (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}
      </Text>
      <View>
        {showing && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            minimumDate={new Date()}
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
        {users.length ? (
          <FlatList
            data={users}
            renderItem={({ item }) => {
              return (
                <View style={styles.userContainer}>
                  <Text style={styles.userGamerTag}>
                    {item.attributes.gamertag}
                  </Text>
                  <Pressable
                    style={
                      squadMembers.includes(item.id)
                        ? styles.invitedBtn
                        : styles.inviteBtn
                    }
                  >
                    <Text
                      onPress={() => inviteSquadMemberHandler(item.id)}
                      disabled={squadMembers.includes(item.id)}
                      style={
                        squadMembers.includes(item.id)
                          ? styles.invited
                          : styles.inviteText
                      }
                    >
                      Invite
                    </Text>
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
        onPress={formSquadHandler}
      >
        <Text style={styles.formSquadText}>FORM SQUAD!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#201626",
    paddingTop: 50,
    minHeight: "100%",
    alignItems: "center",
  },
  selectGameBtnStyle: {
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#393051",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 5,
  },
  selectGameBtnTextStyle: {
    color: "#fff",
  },
  selectGameDropdownStyle: {
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
    shadowColor: "#3AE456",
    borderWidth: 2,
    backgroundColor: "#393051",
    borderRadius: 5,
  },
  selectGameRowTextStyle: {
    color: "#3AE456",
  },
  competitiveBtn: {
    flexDirection: "row",
  },
  competitiveBoxCasual: {
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  competitiveBoxCompetitive: {
    backgroundColor: "#3AE456",
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
  },
  competitiveTxt: {
    marginRight: 10,
    fontSize: 21,
    color: "#fff",
    minWidth: 120,
    textAlign: "center",
  },
  chooseDateBtn: {
    backgroundColor: "#393051",
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    shadowColor: "#3AE345",
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
    backgroundColor: "#393051",
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    shadowColor: "#3AE345",
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
    shadowColor: "#3AE345",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
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
    backgroundColor: "#393051",
    borderWidth: 1,
    borderColor: "#3AE456",
    borderRadius: 20,
    shadowColor: "#3AE345",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 60,
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
    borderRadius: 10,
  },
  userGamerTag: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    color: "#fff",
    fontSize: 16,
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
  invitedBtn: {
    backgroundColor: "#3AE456",
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
  invited: {
    backgroundColor: "#3AE456",
    color: "#000",
  },
  inviteText: {
    color: "#fff",
  },
});

export default FormSquadScreen;
