import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-dark">
      <div className="container">
        <div className="row pt-5">
          <div className="col-8 col-sm">
            <h5 className="mb-3">GET HELP</h5>
            <ul className="list-unstyled list-py-1 mb-5">
              <li>
                <NavLink className="nav-link active" href="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link active" href="/">
                  Nike
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link active" href="/">
                  Adidas
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link activet" href="/">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-8 col-sm mb-7 mb-sm-0">
            <h5 className="mb-3">SUPPORT</h5>
            <ul className="list-unstyled list-py-1 mb-5">
              <li>
                <NavLink className="nav-link active" href="/">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link active" href="/">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link active" href="/">
                  Help
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link activet" href="/">
                  Phone
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-6 col-sm mb-7">
            <h5 className="mb-3">REGISTER</h5>
            <ul className="list-unstyled list-py-1 mb-5">
              <li>
                <NavLink className="nav-link active" href="/">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link active" href="/">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="w-md-85 text-lg-center mx-lg-auto"
        style={{ height: "50px", lineHeight: "50px", background: "#D9D9D9" }}
      >
        <p className="text-dark-50 small">
          © 2022 Cybersoft All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
