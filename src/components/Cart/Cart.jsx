/**Cart(모달)화면을 구성하는 컴포넌트 */
import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "./CartContext";
import classes from "./Cart.module.css";
import { formattedPrice } from "../../common";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigator = useNavigate();

  // context에서 불러오기 (배열, 총가격, 수정관련, 삭제관련)
  const { items, totalPrice, addItemInCart, delItemFromCart } =
    useContext(CartContext);

  // const setCartTotalPrice = () => {
  //   setCartItems({ items: cartItems, totalPrice: totalPrice });
  // };
  // localStorage에 저장된 user 있다면 이름 불러오기
  const userName = localStorage.getItem("user_name");
  // localStorage에서 총 가격 가져오기
  //const totalPriceRef = useRef(localStorage.getItem("cart_total_price") || 0);

  let totalQuantity = 0; // 총 상품 개수를 누적시킬 변수
  // 각 상품의 수량 값 누적하기 : for of
  for (const item of items) {
    totalQuantity += item.amount;
  }

  // 장바구니 수정 삭제 -Context에 만들어둔 함수 사용한 핸들러
  const onAddItemHandler = (item) => {
    addItemInCart(item);
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
    navigator("/");
  };

  useEffect(() => {
    // 마운트 시 로컬 스토리지에서 cartItems 가져오기 (새로고침을 위한 작업)
    const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
    let totalPrice = localStorage.getItem("cart_total_price") || 0;
    // cartItems를 context에 저장
    cartItems.forEach((item) => {
      addItemInCart(item);
      totalPrice += item.price * item.amount;
    });
    // setCartTotalPrice(totalPrice);
  }, []); // 의존성- 빈 배열: 컴포넌트가 처음 마운트될 때만 실행

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
                <button onClick={() => onAddItemHandler(item)}> + </button>
                <button onClick={() => onDelItemHandler(item)}> - </button>
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
