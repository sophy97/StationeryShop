import React from "react";
import logoImg from "../../assets/logo.png";
import tableImage from "../../assets/table.jpg";
import classes from "./Header.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigator = useNavigate();
  return (
    <React.Fragment>
      <header className={classes.header}>
        <img className={classes.logo} src={logoImg} alt="main logo" onClick={()=>{navigator("/")}}/>
        <Navbar />
      </header>
      <div className={classes["main-image"]}>
        <img src={tableImage} alt="header image" />
      </div>
    </React.Fragment>
  );
};

export default Header;
