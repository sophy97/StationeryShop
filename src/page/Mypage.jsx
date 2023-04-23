/** 간단한 마이페이지 기능 구현 - 로컬스토리지 정보 출력 */
import React, { useContext } from "react";
import classes from "./Mypage.module.css";
import { CartContext } from "../components/Cart/CartContext";
import { formattedPrice } from "../common";
const Mypage = () => {
  const { items } = useContext(CartContext);
  const userName = localStorage.getItem("user_name");
  const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
  console.log(cartItems);
  return (
    <div className={classes.wrapper}>
      <h2>MY page</h2>
      <h3>
        <span style={{ color: "brown" }}>{userName}</span> 님, 반갑습니다!{" "}
      </h3>
      <div className={classes.my_cart}>
        <h3 className={classes.orderList_title}>주문 내역</h3>
        <section className={classes.cart}>
          {items.map((item) => {
            const formatPrice = formattedPrice(item.price);
            return (
              <div key={item.id} className={classes.wrapper}>
                <h3>{item.name}</h3>
                <p>
                  {formatPrice}{" "}|{" "}
                  <span className={classes.amount}>{item.amount}</span>개
                </p>
                <h3>{formattedPrice(item.price * item.amount)}</h3>
                <br />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Mypage;
