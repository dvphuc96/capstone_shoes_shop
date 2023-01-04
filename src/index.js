import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import {
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import { HomeTemplate } from "./Templates/HomeTemplate";
import ResponsiveItem from "./HOC/ResponsiveItem";
import Home from "./Pages/Home/Home";
import MobileHome from "./Pages/Home/MobileHome";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Carts from "./Pages/Carts/Carts";
import Detail from "./Pages/Detail/Detail";
import Search from "./Pages/Search/Search";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="" element={<HomeTemplate />}>
            <Route
              index
              element={
                <ResponsiveItem component={Home} mobileComponent={MobileHome} />
              }
            ></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="cart" element={<Carts />}></Route>
            <Route path="detail/:id" element={<Detail />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </Provider>
  </>
);
