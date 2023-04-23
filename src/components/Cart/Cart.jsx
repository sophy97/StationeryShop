/**Cart(모달)화면을 구성하는 컴포넌트 */
import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import classes from "./Cart.module.css";
import { formattedPrice } from "../../common";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigator = useNavigate();

  // context에서 불러오기 (카트에 담긴 아이템들, 총가격, 카트에 담기, 삭제)
  const { items, totalPrice, addItem, delItemFromCart } =
    useContext(CartContext);

  // localStorage에 저장된 user 있다면 이름 불러오기
  const userName = localStorage.getItem("user_name");
  // 총 상품 개수를 누적시킬 변수
  let totalQuantity = 0;
  // 각 상품의 수량 값 누적하기 : for of
  for (const item of items) {
    totalQuantity += item.amount;
  }

  // 장바구니 수정 삭제 -Context에 만들어둔 함수 사용한 핸들러
  const onAddItemHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const onDelItemHandler = (item) => {
    delItemFromCart(item);
  };

  // 주문하기 버튼 > Cart에 담긴 정보를 localStorage에 저장 : setItem
  const onOrderHandler = () => {
    localStorage.setItem("cart_items", JSON.stringify(items));
    localStorage.setItem("cart_total_price", totalPrice);
    alert("주문서 작성이 완료되었습니다!");
    props.modalCloseHandler();
    navigator("/mypage");
  };

  return (
    <>
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
                <button onClick={() => onDelItemHandler(item)}> - </button>
                <button onClick={() => onAddItemHandler(item)}> + </button>
              </div>
              <h3>{formattedPrice(item.price * item.amount)}</h3>
              <br />
            </div>
          );
        })}
        <span>
          {totalQuantity !== 0 ? (
            <p>
              총 상품 개수:{" "}
              <span style={{ color: "brown", fontSize: "1.3rem" }}>
                {totalQuantity}
              </span>
            </p>
          ) : (
            <p>카트에 상품이 없습니다. 상품을 추가해 주세요!</p>
          )}
        </span>
        <br />
        <span className={classes.totalPrice}>
          최종 가격 : {formattedPrice(totalPrice)}
        </span>
        {totalQuantity !== 0 && (
          <button onClick={onOrderHandler} className={classes.orderBtn}>
            주문하기
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;
