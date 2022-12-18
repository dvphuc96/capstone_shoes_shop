import { createSlice } from "@reduxjs/toolkit";
import {
  saveStoreJson,
  getStoreJson,
  USER_LOGIN,
  ACCESS_TOKEN,
  saveStore,
  https,
} from "../../util/config";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
  userProfile: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUserLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { getUserLoginAction, getProfileAction } = userReducer.actions;

export default userReducer.reducer;
