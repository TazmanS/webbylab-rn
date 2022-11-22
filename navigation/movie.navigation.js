import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import MoviesScreen from "../screens/MoviesScreen";
import MovieScreen from "../screens/MovieScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_TOKEN } from "../helpers/constants";
import { useDispatch } from "react-redux";
import { setSessionToken } from "../store/globalSlice";

const Stack = createNativeStackNavigator();

const MovieNavigation = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_TOKEN);
      dispatch(setSessionToken(null));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="MoviesScreen"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={logout}>
            <Text style={{ color: "blue" }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />
    </Stack.Navigator>
  );
};

export default MovieNavigation;
