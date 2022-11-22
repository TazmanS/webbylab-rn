import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";

const BaseInput = (props) => {
  const {
    placeholder,
    value,
    setValue,
    icon,
    autoCapitalize = "none",
    touched,
    error,
    width = "80%",
    ...other
  } = props;

  const validationColor = !touched ? "#223e4b" : error ? "#FF5A5F" : "#223e4b";

  const _setValue = (text) => {
    setValue(text);
  };

  return (
    <View
      style={{
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        width,
        ...styles.input,
      }}
    >
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={_setValue}
          autoCapitalize={autoCapitalize}
          {...other}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    padding: 8,
  },
});

export default BaseInput;
