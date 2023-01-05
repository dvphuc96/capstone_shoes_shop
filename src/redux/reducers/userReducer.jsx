import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../index";
import {
  ACCESS_TOKEN,
  getStoreJson,
  https,
  saveStore,
  saveStoreJson,
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

/*asyn action */
export const loginApi = (userLogin) => {
  return async (dispatch) => {
    const result = await https.post("/api/Users/signin", userLogin);
    // cập nhật cho reducer
    const action = getUserLoginAction(result.data.content);
    dispatch(action);
    saveStore(ACCESS_TOKEN, result.data.content.accessToken);
    saveStoreJson(USER_LOGIN, result.data.content);
    const actionProfile = getProfileAction();
    dispatch(actionProfile);
    history.push("/");
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    const result = await https.post("/api/Users/getProfile");
    // cập nhật cho reducer
    const action = getProfileAction(result.data.content);
    dispatch(action);
  };
};

export const loginFacebookApi = (facebookToken) => {
  return async (dispatch) => {
    const result = await https.post("/api/Users/facebooklogin", facebookToken);
    // cập nhật cho reducer
    const action = getUserLoginAction(result.data.content);
    dispatch(action);
    saveStore(ACCESS_TOKEN, result.data.content.accessToken);
    saveStoreJson(USER_LOGIN, result.data.content);
    const actionProfile = getProfileAction();
    dispatch(actionProfile);
    history.push("/");
  };
};