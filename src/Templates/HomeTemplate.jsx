import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../Components/HeaderHome";
const HomeTemplate = () => {
  return (
    <>
      <HeaderHome />
      <div style={{ minHeight: "75vh" }}>
        <Outlet />
      </div>
      <footer className="bg-dark text-white text-center p-3">Footer</footer>
      {/* <ContainerModal /> */}
    </>
  );
};

export default HomeTemplate;
