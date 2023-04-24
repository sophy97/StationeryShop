import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Modal from "./../UI/Modal";
import Cart from "./../Cart/Cart";

const Navbar = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || null
  );
  const [showModal, setShowModal] = useState(false);

  // 로그아웃 함수(localStorage에서 정보 삭제)
  const localLogOut = () => {
    alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("user_name");
    window.location.reload();
  };
  // 모달 관리 함수
  const modalOpenHandler = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const modalCloseHandler = () => {
    setShowModal(false);
    document.body.style.overflow = "visible";
  };

  return (
    <div className={classes.link}>
      <NavLink
        to="/"
        className={({ isActive }) => {
          return isActive ? classes.active : null;
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) => {
          return isActive ? classes.active : "";
        }}
      >
        Shop
      </NavLink>
      {userName ? (
        <div className={classes.logout}>
          <span>
            <b className={classes.myCart} onClick={modalOpenHandler}>
              <FontAwesomeIcon icon={faCartShopping} flip="horizontal" />
            </b>
          </span>
          <br />
          {userName}님,
          <button onClick={localLogOut}>LogOut</button>
          {showModal && (
            <Modal modalCloseHandler={modalCloseHandler}>
              <Cart modalCloseHandler={modalCloseHandler} />
            </Modal>
          )}
        </div>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => {
            return isActive ? classes.active : null;
          }}
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
