/**Cart(모달)화면을 구성하는 컴포넌트 */
import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import classes from "./Cart.module.css";
import { formattedPrice } from "../../common";

const Cart = () => {
  // context에서 불러오기
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);

  let totalQuantity = 0; // 총 상품 개수를 누적시킬 변수
  // 각 상품의 수량 값 누적하기
  for (const item of items) {
    totalQuantity += item.amount;
  }

  return (
    <div className={classes.cart}>
      <h1>Cart</h1>
       <br />
      {items.map((item) => {
        const formatPrice = formattedPrice(item.price);
        return (
          <div key={item.id} className={classes.wrapper}>
            <h3>{item.name}</h3>
            <p>
              가격: {formatPrice} x{" "}
              <span className={classes.amount}>{item.amount}</span>개
            </p>
            <h3>{formattedPrice(item.price * item.amount)}</h3>
            <br />
          </div>
        );
      })}
      <hr />
      <span>총 상품 개수: {totalQuantity}</span> <br />
      <span className={classes.totalAmount}>최종 가격 : {formattedPrice(totalAmount)}</span>
    </div>
  );
};

export default Cart;
