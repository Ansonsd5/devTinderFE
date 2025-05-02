import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="d-flex flex-col ">
      <Nav />
      <div className="h-screen">
      <Outlet />

      </div>
      <Footer/>
    </div>
  );
};

export default Body;
