import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/components/HomeScreen";
import MyGames from "./src/components/MyGames";
import SearchGames from "./src/components/SearchGames";
import FormSquadScreen from "./src/components/FormSquadScreen";
import MySquads from "./src/components/MySquads";
import CustomDrawer from "./src/components/CustomDrawer";

const Drawer = createDrawerNavigator();

const App = () => {
  const [userGames, setUserGames] = useState(null);

  const addGame = (game) => {
    setUserGames(() => [...userGames, game]);
  };

  const removeGame = (game) => {
    setUserGames(() =>
      userGames.filter((element) => element.title !== game.title)
    );
  };

  useEffect(() => {
    fetch(`https://squadfinder2205be.herokuapp.com/api/v1/users/1/games`)
      .then((response) => response.json())
      .then((data) => setUserGames(data.data));
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerLabelStyle: {
            color: "#3AE456",
            fontSize: 20,
          },
        }}
      >
        <Drawer.Screen name="Home">
          {() => <HomeScreen myGames={userGames} />}
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
