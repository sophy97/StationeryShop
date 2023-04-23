import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Modal from "./../UI/Modal";
import Cart from './../Cart/Cart';

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
    console.log("cart 모달 오픈 누름");
  };
  const modalCloseHandler = () => {
    setShowModal(false);
    document.body.style.overflow = "visible";
  };

  return (
    <div className={classes.link}>
      <NavLink exact={String(true)} to="/">
        Home
      </NavLink>
      <NavLink to="/shop">Shop</NavLink>
      {userName ? (
        <div className={classes.logout}>
          <span>
            {userName}님, <b onClick={modalOpenHandler}>🛒</b>
          </span>
          <br />
          <button onClick={localLogOut}>LogOut</button>
          {showModal && (
            <Modal modalCloseHandler={modalCloseHandler}>
              <Cart modalCloseHandler={modalCloseHandler} />
            </Modal>
          )}
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};

export default Navbar;
