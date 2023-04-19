import React, { useState } from "react";

import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState(localStorage.getItem("user_name") || null)
  return (
    <div className={classes.link}>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      {userName ? <p>{userName}님</p> : <Link to="/login">Login</Link>}
    </div>
  );
};

export default Navbar;
