import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
export default function MainNavigation() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
