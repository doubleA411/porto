import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

function WithNav() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default WithNav;
