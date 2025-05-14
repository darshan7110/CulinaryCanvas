import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
// import { styles } from "";
// import hamIcon from "../assets/hamIcon.svg"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  let user = JSON.parse(localStorage.getItem("user"));
  // let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null; // Check for null before parsing

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="leftBox">
          <img src="/Icon.svg" alt="" id="IconSvg" />
          <h2>Culinary Canvas </h2>
        </div>
        <div className="rightBox">
          <ul className="list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li onClick={() => isLogin && setIsOpen(true)}>
              <NavLink to={!isLogin ? "/myRecipie" : "/"}>My Recipe</NavLink>
            </li>
            <li onClick={() => isLogin && setIsOpen(true)}>
              <NavLink to={!isLogin ? "/favRecipie" : "/"}>Favourites</NavLink>
            </li>
            <li onClick={checkLogin}>
              <p className="login">
                {isLogin ? "Login" : "Logout"}{" "}
            
              
                {user?.email ? `(${user?.email})` : ""}
              </p>  
            </li>
          </ul>
          
        </div>
        <button id="responsiveNavButton" ></button>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
