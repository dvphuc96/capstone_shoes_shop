import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../index";
import { removeStore, USER_LOGIN, ACCESS_TOKEN } from "../util/config";

const HeaderHome = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const renderLoginButton = () => {
    if (userLogin) {
      return (
        <>
          <NavLink to="/profile" className="nav-link mx-3 text-white">
            Hello ! {userLogin.email}
          </NavLink>
          <span
            className="text-white"
            style={{ cursor: "pointer", marginRight: "15px" }}
            onClick={() => {
              removeStore(ACCESS_TOKEN);
              removeStore(USER_LOGIN);
              history.push("/login");
              window.location.reload();
            }}
          >
            Logout
          </span>
        </>
      );
    }
    return (
      <NavLink to="/login" className="nav-link mx-3 text-white">
        Login
      </NavLink>
    );
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Shoe Shop
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/" aria-current="page">
                Home <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
          </ul>
          <form className="d-flex my-2 my-lg-0">
            <NavLink to="/cart">
              <i
                className="fa fa-cart-plus text-white"
                style={{ fontSize: "25px" }}
              ></i>
            </NavLink>
            {renderLoginButton()}
          </form>
        </div>
      </nav>
    </div>
  );
};

export default HeaderHome;
