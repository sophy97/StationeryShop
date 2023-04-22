/**Cart(모달)화면을 구성하는 컴포넌트 */
import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import classes from "./Cart.module.css";
import { formattedPrice } from "../../common";

const Cart = () => {
  // context에서 불러오기 (배열, 총가격, 수정관련, 삭제관련)
  const { items, totalAmount, addCartCount, delCartCount } =
    useContext(CartContext);
  // localStorage에 저장된 user 있다면 이름 불러오기
  const userName = localStorage.getItem("user_name");

  let totalQuantity = 0; // 총 상품 개수를 누적시킬 변수
  // 각 상품의 수량 값 누적하기 : for of
  for (const item of items) {
    totalQuantity += item.amount;
  }

  // 장바구니 수정 삭제 -Context에 만들어둔 함수 사용한 핸들러
  // addToHandler재사용 말고, 별도 핸들러 생성(addInHandler)
  const onAddItemHandler = (item) => {
    addCartCount(item);
  };
  const onDelItemHandler = (item) => {
    delCartCount(item);
  };

  return (
    <div className={classes.cart}>
      <h1>
        <span className={classes.user}>{userName}</span>'s Cart
      </h1>
      <br />
      {items.map((item) => {
        const formatPrice = formattedPrice(item.price);
        return (
          <div key={item.id} className={classes.wrapper}>
            <h3>{item.name}</h3>
            <p>
              가격: {formatPrice} x
              <span className={classes.amount}>{item.amount}</span>개
            </p>
            <div className={classes.btnWrapper}>
              <button onClick={() => onAddItemHandler(item)}> + </button>
              <button onClick={() => onDelItemHandler(item)}> - </button>
            </div>
            <h3>{formattedPrice(item.price * item.amount)}</h3>
            <br />
          </div>
        );
      })}
      <hr />
      <span>
        {totalQuantity !== 0 ? (
          <p>총 상품 개수: {totalQuantity}</p>
        ) : (
          <p>카트에 상품이 없습니다. 상품을 추가해 주세요!</p>
        )}
      </span>
      <br />
      <span className={classes.totalAmount}>
        최종 가격 : {formattedPrice(totalAmount)}
      </span>
    </div>
  );
};

export default Cart;
