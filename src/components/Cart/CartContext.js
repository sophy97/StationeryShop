/**
 * Cart에 담을 product에 접근하기 위한 State 전역 관리 */
import { createContext, useState } from "react";

// createContext 함수를 사용해 Context 객체 생성
const CartContext = createContext();

// CartProvider 컴포넌트를 생성
const CartProvider = ({ children }) => {
  // 카트에 담긴 아이템 관리할 state, 초기값 설정
  const [cartItems, setCartItems] = useState({
    items: [],
    totalPrice: 0,
  });

  // 상세페이지 > 장바구니 추가. 같은 상품이면 amount만 증가
  const addItemToCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedItems;
      if (existingCartItemIndex !== -1) {
        const existingCartItem = prevState.items[existingCartItemIndex];
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + item.amount,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex] = updatedCartItem;
      } else {
        updatedItems = [...prevState.items, item];
      }
      const updatedPrice = prevState.totalPrice + item.price * item.amount;
      return { items: updatedItems, totalPrice: updatedPrice };
    });
  };

  // Cart컴포넌트에서, 수량 같은 상품일때 amount 1씩 수량 증가
  const addItemInCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedItems;
      // 이미 카트에 담긴 상품일 경우 : 수량+1
      if (existingCartItemIndex !== -1) {
        const existingCartItem = prevState.items[existingCartItemIndex];
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex] = updatedCartItem;
        const updatedPrice = prevState.totalPrice + existingCartItem.price;
        return { items: updatedItems, totalPrice: updatedPrice };
      } else {
        // 카트에 없는 상품일 경우 : 새 요소 추가 & 가격도 업데이트
        updatedItems = [...prevState.items, item];
        const updatedPrice = prevState.totalPrice + item.price;
        return { items: updatedItems, totalPrice: updatedPrice };
      }
    });
  };

  // Cart컴포넌트에서, 수량 같은 상품일때 amount 1씩 감소, 0이면 제거
  const delItemFromCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedItems;
      // 이미 카트에 담긴 상품일 경우 : 수량 -1
      if (existingCartItemIndex !== -1) {
        const existingCartItem = prevState.items[existingCartItemIndex];
        let updatedCartItem;
        if (existingCartItem.amount > 1) {
          updatedCartItem = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1,
          };
          updatedItems = [...prevState.items];
          updatedItems[existingCartItemIndex] = updatedCartItem;
        } else {
          updatedItems = prevState.items.filter(
            (cartItem) => cartItem.id !== item.id
          );
        }
        const updatedPrice = prevState.totalPrice - item.price;
        return { items: updatedItems, totalPrice: updatedPrice };
      } else {
        // 담기지 않은 경우는 보이지 않음
        return prevState;
      }
    });
  };

  // 다른 컴포넌트에서 넘겨받을 value설정
  const cartContextValue = {
    items: cartItems.items,
    totalPrice: cartItems.totalPrice,
    addItem: addItemToCart,
    addItemInCart: addItemInCart,
    delItemFromCart: delItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
