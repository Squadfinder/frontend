import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./src/components/LoginScreen";
import HomeScreen from "./src/components/HomeScreen";
import MyGames from "./src/components/MyGames";
import SearchGames from "./src/components/SearchGames";
import FormSquadScreen from "./src/components/FormSquadScreen";
import MySquads from "./src/components/MySquads";
import CustomDrawer from "./src/components/CustomDrawer";

import { getAllUsers, getSingleUser } from "./src/apiCalls";

const Drawer = createDrawerNavigator();

const App = () => {
  const [userGames, setUserGames] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getSingleUser(1)
      .then((data) => {
        setError("");
        setCurrentUser(data.data);
        setUserGames(data.data.attributes.user_games);
      })
      .catch(() => setError("Looks like something went wrong retrieving the user data."));

    getAllUsers()
      .then((data) => setAllUsers(data.data))
      .catch(() => setError("Looks like something went wrong retrieving the user data."));
  }, []);

  const addGame = (game) => {
    setUserGames((currentUserGames) => [...currentUserGames, game]);
  };

  const removeGame = (gameID) => {
    const updatedUserGames = userGames.filter(
      (userGame) => userGame.game_id !== gameID
    );
    setUserGames(updatedUserGames);
  };

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
        <Drawer.Screen name="Select a Profile">
          {() => (
            <LoginScreen
              allUsers={allUsers}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              userGames={userGames}
              setUserGames={setUserGames}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Home">
          {() => (
            <HomeScreen
              error={error}
              setError={setError}
              user={currentUser}
              myGames={userGames}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="My Games">
          {() => (
            <MyGames
              userGames={userGames}
              addGame={addGame}
              removeGame={removeGame}
              userID={currentUser.id}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Search for Games">
          {() => (
            <SearchGames
              userGames={userGames}
              addGame={addGame}
              removeGame={removeGame}
              userID={currentUser.id}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Form Squad">
          {() => (
            <FormSquadScreen
              userGames={userGames}
              allUsers={allUsers.filter((user) => user.id !== currentUser.id)}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="My Squads">
          {() => <MySquads userID={currentUser.id} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
