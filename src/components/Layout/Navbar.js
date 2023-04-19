import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || null
  );
  // 로그아웃 함수(localStorage에서 정보 삭제)
  const localLogOut = () => {
    alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("user_name");
    window.location.reload();
  };
  return (
    <div className={classes.link}>
      <NavLink exact={String(true)} to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      {userName ? (
        <div className={classes.logout}>
          <span>{userName}님 |</span>
          <button onClick={localLogOut}>LogOut</button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};

export default Navbar;
