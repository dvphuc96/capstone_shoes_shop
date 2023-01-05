import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { history } from "../../index";
import {
  ACCESS_TOKEN,
  getStoreJson,
  https,
  saveStore,
  saveStoreJson,
  USER_LOGIN,
  USER_PROFILE,
} from "../../util/config";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
  userProfile: getStoreJson(USER_PROFILE),
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
    editProfileAction: (state, action) => {
      state = action.payload
    },
    deleProfileAction: (state, action) => {
      state = action.payload
    }
  },
});

export const { getUserLoginAction, getProfileAction, editProfileAction, deleProfileAction } = userReducer.actions;

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
    const actionProfile = getProfileApi();
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
    console.log(result.data.content)
    saveStoreJson(USER_PROFILE, result.data.content)
  };
};

export const editProfileApi = (editProfile) => {
  return async dispatch => {
    await https.post('/api/Users/updateProfile', editProfile).then((res) => {
      const action = editProfileAction(res.data.content);
      dispatch(action);
      message.success("Update success");
    }).catch((err) => {
      message.error(`${err.response.data.content}`);
      return;
    })
  }
};


export const deleteIdProductApi = (id) => {
  return async dispatch => {
    await https.post('/api/Users/deleteOrder', id).then((res) => {
      const action = deleProfileAction();
      dispatch(action);
      const getProfileAction = getProfileApi()
      dispatch(getProfileAction)
      message.success("Delte Succses");
    }).catch((err) => {
      message.error(`${err.response.data.content}`);
      return;
    })
  }
}

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