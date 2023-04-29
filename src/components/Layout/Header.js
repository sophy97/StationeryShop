import React from "react";
import classes from "./Header.module.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Navbar />
      </header>
    </React.Fragment>
  );
};

export default Header;
