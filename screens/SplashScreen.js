import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
