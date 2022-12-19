import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export const HomeTemplate = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "75vh" }}>
        <Outlet />
      </div>
      <Footer />
      {/* <ContainerModal /> */}
    </>
  );
};
