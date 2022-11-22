import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { apiCreateAccount } from "../api/account";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_TOKEN } from "../helpers/constants";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().min(3, "Too Short!").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Required"),
});

const RegisterScreen = (props) => {
  const {} = props;

  const register = async () => {
    try {
      const res = await apiCreateAccount({
        ...values,
      });
      const jsonValue = JSON.stringify(res.data.token);
      await AsyncStorage.setItem(SESSION_TOKEN, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: RegisterSchema,
      initialValues: { email: "", name: "", password: "", confirmPassword: "" },
      onSubmit: () => register(),
    });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Create new account</Text>
      <BaseInput
        placeholder="Email"
        value={values.email}
        // setValue={(text) => setForm({ ...form, email: text })}
        setValue={handleChange("email")}
        icon="mail"
        onBlur={handleBlur("email")}
        error={errors.email}
        touched={touched.email}
      />
      <BaseInput
        placeholder="Name"
        value={values.name}
        // setValue={(text) => setForm({ ...form, name: text })}
        setValue={handleChange("name")}
        icon="user"
        onBlur={handleBlur("name")}
        error={errors.name}
        touched={touched.name}
      />
      <BaseInput
        placeholder="Password"
        value={values.password}
        // setValue={(text) => setForm({ ...form, password: text })}
        setValue={handleChange("password")}
        secureTextEntry
        icon="key"
        onBlur={handleBlur("password")}
        error={errors.password}
        touched={touched.password}
      />
      <BaseInput
        placeholder="Confirm password"
        value={values.confirmPassword}
        // setValue={(text) => setForm({ ...form, confirmPassword: text })}
        setValue={handleChange("confirmPassword")}
        secureTextEntry
        icon="key"
        onBlur={handleBlur("confirmPassword")}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
      />
      <BaseButton title="Create" onPress={handleSubmit} />
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
});

export default RegisterScreen;
