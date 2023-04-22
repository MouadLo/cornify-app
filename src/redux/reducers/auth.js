import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInAction: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    signUpAction: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    signOutAction: (state) => {
      state.user = null;
      state.error = null;
    },
    setErrorAction: (state, action) => {
      state.error = action.payload;
    },
    setLoadingAction: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  signInAction,
  signUpAction,
  signOutAction,
  setErrorAction,
  setLoadingAction,
} = authSlice.actions;

export default authSlice.reducer;
