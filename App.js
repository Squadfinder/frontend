import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/components/HomeScreen";
import MyGames from "./src/components/MyGames";
import SearchGames from "./src/components/SearchGames";
import GameDetailsScreen from "./src/components/GameDetailsScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="My Games" component={MyGames} />
        <Drawer.Screen name="Search for Games" component={SearchGames} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
