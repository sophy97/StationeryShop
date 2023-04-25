import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./../UI/Modal";
import Cart from "./../Cart/Cart";
import { CartContext } from "../Cart/CartContext";

const Navbar = () => {
  const navigator = useNavigate();
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || null
  );

  // CartContext.js에서 장바구니 모달 state, handler부르기
  const cartCtx = useContext(CartContext);
  const { showModal, modalOpenHandler, modalCloseHandler } = cartCtx;
  // 로그아웃 함수(localStorage에서 정보 삭제)
  const localLogOut = () => {
    alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("user_name");
    
    navigator("/");
    window.location.reload();
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
          <b style={{color:"brown"}}>{userName}</b>님
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
