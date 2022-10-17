import React from "react";
import { View, Text, Modal, Pressable, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const NavMenu = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  return (
    // Testing is Pressable, but doesn't do anything currently
    <View>
      <Modal visible={modalVisible} animationType="slide">
        <Pressable style={styles.textContainer}>
          <Text>Testing</Text>
        </Pressable>
        <Button title="Home Page" onPress={() => {
          navigation.push("Home")
          setModalVisible(false)}} />
        <Button title="Profile Page" onPress={() => {
          navigation.push("Profile")
          setModalVisible(false)}} />
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
});

export default NavMenu;
