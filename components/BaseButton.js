import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const BaseButton = (props) => {
  const { title, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0A95FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 6,
  },
  title: {
    color: "white",
  },
});

export default BaseButton;
