import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { useFormik } from "formik";
import { apiCreateSession } from "../api/account";
import { SESSION_TOKEN } from "../helpers/constants";
import { useDispatch } from "react-redux";
import { setSessionToken } from "../store/globalSlice";

const LoginScema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

const Login = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const goToRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const login = async () => {
    try {
      const res = await apiCreateSession({ ...values });
      const jsonValue = JSON.stringify(res.data.token);
      await AsyncStorage.setItem(SESSION_TOKEN, jsonValue);
      dispatch(setSessionToken(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginScema,
      initialValues: { email: "", password: "" },
      onSubmit: () => login(),
    });

  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Log in your account or </Text>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.link}>create new</Text>
        </TouchableOpacity>
      </View>

      <BaseInput
        placeholder="Email"
        value={values.email}
        setValue={handleChange("email")}
        icon="mail"
        onBlur={handleBlur("email")}
        error={errors.email}
        touched={touched.email}
      />
      <BaseInput
        placeholder="Password"
        value={values.password}
        setValue={handleChange("password")}
        secureTextEntry
        icon="key"
        onBlur={handleBlur("password")}
        error={errors.password}
        touched={touched.password}
      />
      <BaseButton title="Log in" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  link: {
    color: "blue",
    fontSize: 20,
  },
});

export default Login;
