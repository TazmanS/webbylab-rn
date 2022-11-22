import axios from "axios";
import { MOVIES_BACK_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_TOKEN } from "../helpers/constants";
import store from "../store/index";
import { setSnackbar } from "../store/globalSlice";

const http = axios.create({
  baseURL: MOVIES_BACK_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

http.interceptors.request.use(
  async function (config) {
    const jsonValue = await AsyncStorage.getItem(SESSION_TOKEN);
    const token = JSON.parse(jsonValue);
    if (token) config.headers.Authorization = token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    if (response.data.status === 0 && response.data.error.code) {
      store.dispatch(setSnackbar(response.data.error.code));
      throw new Error();
    } else {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
