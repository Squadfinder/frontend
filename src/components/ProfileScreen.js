import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text class="test">profile screen</Text>
      <StatusBar style="auto" />
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default ProfileScreen;