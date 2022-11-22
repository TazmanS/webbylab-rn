import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    session_token: null,
    movies: [],
    snackbar: null,
  },
  reducers: {
    setSessionToken: (state, action) => {
      state.session_token = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
  },
});

export const { setSessionToken, setMovies, setSnackbar } = globalSlice.actions;

export default globalSlice.reducer;
