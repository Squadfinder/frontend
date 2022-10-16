import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import HeaderNavBtn from "./src/components/HeaderNavBtn";
import HomeScreen from "./src/components/HomeScreen";
import ProfileScreen from "./src/components/ProfileScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  // modalVisible controls the modal condition that determines if it is being displayed
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              // headerRight takes in a function and returns a component.
              // Thy syntax here looks a little weird b/c the linter is breaking a single line arrow function into multi lines.
              <HeaderNavBtn
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerRight: () => (
              <HeaderNavBtn
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
