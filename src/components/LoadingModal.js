import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoadingModal = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{ marginTop: 150 }}
        size="large"
        color="#3AE456"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#201626",
  },
  loadingText: {
    color: "#3AE456",
    fontSize: 30,
  },
});

export default LoadingModal;
