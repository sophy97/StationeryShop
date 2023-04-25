/**Cart(모달)화면을 구성하는 컴포넌트 */
import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import classes from "./Cart.module.css";
import { formattedPrice } from "../../common";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigator = useNavigate();

  // context에서 불러오기 (카트 관련 작업들 대부분 전역 관리)
  const {
    items,
    totalPrice,
    modalCloseHandler,
    onAddItemHandler,
    onDelItemHandler,
  } = useContext(CartContext);

  // localStorage에 저장된 user 있다면 이름 불러오기
  const userName = localStorage.getItem("user_name");
  // 총 상품 개수를 누적시킬 변수
  let totalQuantity = 0;
  // 각 상품의 수량 값 누적하기 : for of
  for (const item of items) {
    totalQuantity += item.amount;
  }

  /**
   * Cart 모달 내부에서 사용할 함수들
   */
  // Cart모달 닫고 shop페이지로 이동
  const onMoveToShopPage = () => {
    modalCloseHandler();
    navigator("/shop");
  };
  // 주문하기 > Cart에 담긴 정보를 localStorage에 저장 : setItem
  const onOrderHandler = () => {
    localStorage.setItem("cart_items", JSON.stringify(items));
    localStorage.setItem("cart_total_price", totalPrice);
    alert("주문서 작성이 완료되었습니다!");
    modalCloseHandler();
    navigator("/mypage");
  };

  return (
    <>
      <div className={classes.cart}>
        <h1>
          <span className={classes.user}>{userName}</span>'s Cart
        </h1>

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
            <p style={{ marginBottom: "10px", borderTop:"2px solid lightgray" }}>
              총 상품 개수:{" "}
              <span style={{ color: "brown", fontSize: "1.3rem" }}>
                {totalQuantity}
              </span>
              <br />
              <span className={classes.totalPrice}>
                최종 가격 : {formattedPrice(totalPrice)}
              </span>
            </p>
          ) : (
            <>
              <p style={{ marginBottom: "10px" }}>
                카트에 상품이 없습니다. 상품을 추가해 주세요!
              </p>
              <span className={classes.catBtn} onClick={onMoveToShopPage}>
                쇼핑하러 가기
              </span>
            </>
          )}
        </span>
        {totalQuantity !== 0 && (
          <>
            <button onClick={onMoveToShopPage} className={classes.addBtn}>
              상품 더 담기
            </button>
            <button
              onClick={onOrderHandler}
              className={classes.addBtn}
              style={{ fontWeight: "bolder" }}
            >
              주문하기
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
