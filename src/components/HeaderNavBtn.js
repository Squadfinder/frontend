import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import NavMenu from "./NavMenu";

const HeaderNavBtn = ({ modalVisible, setModalVisible }) => {
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.hamburger}>🍔</Text>
      </Pressable>
      <NavMenu modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  hamburger: {
    fontSize: 32,
  },
});

export default HeaderNavBtn;
