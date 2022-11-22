import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_TOKEN } from "./helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSessionToken } from "./store/globalSlice";
import SplashScreen from "./screens/SplashScreen";
import AccountNavigation from "./navigation/account.navigation";
import MovieNavigation from "./navigation/movie.navigation";
import BaseSnackbar from "./components/BaseSnackbar";

const Wrappers = () => {
  const dispatch = useDispatch();
  const { session_token, snackbar } = useSelector((state) => state.global);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SESSION_TOKEN);
      const token = jsonValue != null ? JSON.parse(jsonValue) : null;
      dispatch(setSessionToken(token));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {session_token ? <MovieNavigation /> : <AccountNavigation />}

      {snackbar && <BaseSnackbar />}
    </NavigationContainer>
  );
};

export default Wrappers;
