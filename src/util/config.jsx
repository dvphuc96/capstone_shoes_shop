import axios from "axios";
import { history } from "../index";
import { isExpired } from "react-jwt";

export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
export const USER_PROFILE = "userProfile";
export const USER_REGISTER = "userRegister";

export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } =
{
  saveStore: (name, stringValue) => {
    localStorage.setItem(name, stringValue);
    return stringValue;
  },
  saveStoreJson: (name, object) => {
    let stringObject = JSON.stringify(object);
    localStorage.setItem(name, stringObject);
    return stringObject;
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  removeStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.removeItem(name);
    }
  },
};
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c";

export const https = axios.create({
  baseURL: "https://shop.cyberlearn.vn",
  timeout: 30000,
});
// Cấu hình cho tất cả các request api

https.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Cấu hình cho tất cả các responese api
https.interceptors.response.use(
  (result) => {
    return result;
  },
  (err) => {
    if (err.response?.status === 400 || err.response?.status === 404) {
      history.push("/");
    }
    if (err.response?.status === 401 || err.response?.status === 403) {
      const isMyTokenExpired = isExpired(getStore(ACCESS_TOKEN));
      if (isMyTokenExpired) {
        alert("Hết phiên đăng nhập yêu cầu đăng nhập lại !");
        removeStore(ACCESS_TOKEN);
        removeStore(USER_LOGIN);
        window.location.href = "/login";
      }
      history.push("/login");
    }
    return Promise.reject(err);
  }
);
