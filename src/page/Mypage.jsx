/** 간단한 마이페이지 기능 구현 - 로컬스토리지의 정보 출력 */
import React, { useContext } from "react";
import classes from "./Mypage.module.css";
import { CartContext } from "../components/Cart/CartContext";
import { formattedPrice } from "../common";
import { useNavigate } from "react-router-dom";
const Mypage = () => {
  const navigator = useNavigate();
  const { items } = useContext(CartContext);
  const userName = localStorage.getItem("user_name");
  const totalPrice = localStorage.getItem("cart_total_price");

  const onResetHandler = () => {
    localStorage.removeItem("cart_items");
    localStorage.removeItem("cart_total_price");
    alert("주문 내역이 삭제되었습니다.");
    navigator("/shop");
    window.location.reload();
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>
        <span style={{ color: "brown", fontSize: "30px" }}>{userName}</span> 님,
        주문이 완료되었습니다.
        <br />
        이용해 주셔서 감사합니다!
        <br />
      </h3>
      <div className={classes.my_cart}>
        <h2 className={classes.orderList_title}>주문 내역</h2>
        <section className={classes.cart}>
          {items.map((item) => {
            const formatPrice = formattedPrice(item.price);
            return (
              <div key={item.id} className={classes.wrapper}>
                <div className={classes.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>
                    {formatPrice} |{" "}
                    <span className={classes.amount}>{item.amount}</span>개
                  </p>
                </div>
                <h3 className={classes.itemPrice}>
                  {formattedPrice(item.price * item.amount)}
                </h3>
              </div>
            );
          })}
        </section>
        <h3 className={classes.total_price}>최종 결제금액 : <span>{formattedPrice(+totalPrice)}</span></h3>
      </div>
      <button onClick={onResetHandler} className={classes.btn}>
        초기화
      </button>
    </div>
  );
};

export default Mypage;
