import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../index";
import { removeStore, USER_LOGIN, ACCESS_TOKEN } from "../util/config";
import logo from "../assets/img/logo.png";

const Header = () => {
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
    <>
      <header className="p-3 bg-dark text-white">
        <div className="container d-flex flex-wrap justify-content-center">
          <NavLink
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none"
            to="/"
          >
            <img src={logo} alt="logo" />
          </NavLink>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 d-flex">
            <NavLink to="/search" className="mx-3">
              <i
                className="fa fa-search text-white text-sm-start"
                style={{ fontSize: "15px" }}
              >Search</i>
            </NavLink>
            <NavLink to="/cart">
              <i
                className="fa fa-cart-plus text-white"
                style={{ fontSize: "25px" }}
              ></i>
            </NavLink>
            {renderLoginButton()}
            <NavLink to="/register" className="nav-link text-white">
              Register
            </NavLink>
          </form>
        </div>
      </header>
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light p-3">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav" style={{fontSize:'20px'}}>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" aria-current="page">
                  Home <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" aria-current="page">
                  Men <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" aria-current="page">
                  Woman <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" aria-current="page">
                  Kid <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" aria-current="page">
                  Sport <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
