import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./../UI/Modal";
import Cart from "./../Cart/Cart";
import { CartContext } from "../Cart/CartContext";
import logoImg from "../../assets/logo.png";

const Navbar = () => {
  const navigator = useNavigate();
  // 로컬스토리지 로그인 state
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || null
  );
  // menubar 펼치기 state
  const [showMenu, setShowMenu] = useState(false);

  // CartContext.js에서 장바구니 모달 state, handler부르기
  const cartCtx = useContext(CartContext);
  const { showModal, modalOpenHandler, modalCloseHandler } = cartCtx;
  // 로그아웃 함수(localStorage에서 정보 삭제)
  const localLogOut = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("user_name");
      navigator("/");
      window.location.reload();
    } else {
      navigator("/");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={classes.navbar}>
      <img
        className={classes.logo}
        src={logoImg}
        alt="main logo"
        onClick={() => {
          navigator("/");
        }}
      />
      {userName ? (
        // 로그인 상태의 navbar 구성
        <div className={classes.logged_in}>
          <b style={{ color: "brown" }}>{userName}</b>님,
          <button onClick={localLogOut}>LogOut</button>
          <span onClick={toggleMenu} className={classes.toggle}>
            <FontAwesomeIcon icon={faBars} size="2xl" color="black" />
          </span>
          {showMenu && (
            <div className={classes.menu}>
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
                  return isActive ? classes.active : null;
                }}
              >
                Shop
              </NavLink>
              <span>
                <b className={classes.myCart} onClick={modalOpenHandler}>
                  <FontAwesomeIcon icon={faCartShopping} flip="horizontal" />
                </b>
              </span>
            </div>
          )}
          {showModal && (
            <Modal modalCloseHandler={modalCloseHandler}>
              <Cart modalCloseHandler={modalCloseHandler} />
            </Modal>
          )}
        </div>
      ) : (
        // 로그아웃 상태의 navbar 구성
        <div className={classes.logged_out}>
          <span onClick={toggleMenu} className={classes.toggle}>
            <FontAwesomeIcon icon={faBars} size="2xl" color="black" />
          </span>
          {showMenu && (
            <div className={classes.menu}>
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
                  return isActive ? classes.active : null;
                }}
              >
                Shop
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return isActive ? classes.active : null;
                }}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
