import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { errors } from "../helpers/errors";
import { setSnackbar } from "../store/globalSlice";

const BaseSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.global);

  const close = () => {
    dispatch(setSnackbar(null));
  };

  useEffect(() => {
    setTimeout(() => {
      close();
    }, 1000);
  }, []);

  return (
    <TouchableOpacity style={styles.root} onPress={close}>
      <Text style={styles.text}>{errors?.[snackbar] || errors.DEFAULT}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#0A95FF",
    width: "100%",
    padding: 12,
  },
  text: {
    color: "white",
  },
});

export default BaseSnackbar;
