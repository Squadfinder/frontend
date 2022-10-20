import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { allGames } from "./mock-data/MockGamesList";

import HomeScreen from "./src/components/HomeScreen";
import MyGames from "./src/components/MyGames";
import SearchGames from "./src/components/SearchGames";
import FormSquadScreen from "./src/components/FormSquadScreen";
import MySquads from "./src/components/MySquads";

import { getSingleUser } from "./src/apiCalls";

const Drawer = createDrawerNavigator();

const App = () => {
  const [userGames, setUserGames] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getSingleUser(1).then(data => {
      setUser(data.data)
      setUserGames(data.data.attributes.user_games)
    })
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
        <Drawer.Screen name="Form Squad" component={FormSquadScreen} />
        <Drawer.Screen name="My Squads" component={MySquads} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
