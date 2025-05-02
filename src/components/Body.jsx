import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="d-flex flex-col ">
      <Nav />
      <div className="h-[70vh] grid place-content-center">
      <Outlet />

      </div>
      <Footer/>
    </div>
  );
};

export default Body;
