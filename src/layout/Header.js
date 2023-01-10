import React from "react";
import logo from "../image/logo2.png";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="logo" />
    </div>
  );
};

export default Header;
