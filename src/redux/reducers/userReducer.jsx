import { createSlice } from "@reduxjs/toolkit";
import {
  getStoreJson,
  USER_LOGIN,
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
