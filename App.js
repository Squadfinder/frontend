import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { allGames } from "./mock-data/MockGamesList";

import HomeScreen from "./src/components/HomeScreen";
import MyGames from "./src/components/MyGames";
import SearchGames from "./src/components/SearchGames";
import FormSquadScreen from "./src/components/FormSquadScreen";
import MySquads from "./src/components/MySquads";

import { getAllUsers, getSingleUser } from "./src/apiCalls";

const Drawer = createDrawerNavigator();

const App = () => {
  const [userGames, setUserGames] = useState([]);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getSingleUser(1).then(data => {
      setUser(data.data)
      setUserGames(data.data.attributes.user_games)
    })
    getAllUsers().then(data => setAllUsers(data.data))
  }, [])

  const addGame = (game) => {
    setUserGames(() => [...userGames, game]);
  };

  const removeGame = (game) => {
    setUserGames(() =>
      userGames.filter((element) => element.title !== game.title)
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home">
          {() => (
            <HomeScreen
              user={user}
              allUsers={allUsers}
              myGames={userGames}
              addGame={addGame}
              removeGame={removeGame}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="My Games">
          {() => (
            <MyGames
              userGames={userGames}
              addGame={addGame}
              removeGame={removeGame}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Search for Games">
          {() => (
            <SearchGames
              userGames={userGames}
              addGame={addGame}
              removeGame={removeGame}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Form Squad">
          {() => (
            <FormSquadScreen
              userGames={userGames}
              allUsers={allUsers}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="My Squads" component={MySquads} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
