import React from "react";
import { View, Text, Modal, Pressable, Button, StyleSheet } from "react-native";

const NavMenu = ({ modalVisible, setModalVisible }) => {
  return (
    <View>
      <Modal visible={modalVisible} animationType="fade">
        <Pressable style={styles.textContainer}>
          <Text>Testing</Text>
        </Pressable>
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
