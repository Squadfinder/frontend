import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/components/HomeScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import MyGames from "./src/components/MyGames";
import SearchGames from "./src/components/SearchGames";
import FormSquadScreen from "./src/components/FormSquadScreen";
import MySquads from "./src/components/MySquads";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="My Games" component={MyGames} />
        <Drawer.Screen name="Search for Games" component={SearchGames} />
        <Drawer.Screen name="Form Squad" component={FormSquadScreen} />
        <Drawer.Screen name="My Squads" component={MySquads} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
