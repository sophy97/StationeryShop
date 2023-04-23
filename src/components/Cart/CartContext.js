/** Cart에 담을 product접근을 위한 State 전역 관리 */
import { createContext, useState } from "react";

// createContext 함수를 사용해 Context 객체 생성
const CartContext = createContext();
// CartProvider 컴포넌트를 생성
const CartProvider = ({ children }) => {
  // 카트에 담긴 아이템 관리할 state, 초기값 설정
  const initialState =
    localStorage.getItem("cart_items") &&
    localStorage.getItem("cart_items").length > 0
      ? {
          items: JSON.parse(localStorage.getItem("cart_items")),
          totalPrice: Number(localStorage.getItem("cart_total_price")),
        }
      : {
          items: [],
          totalPrice: 0,
        };
  const [cartItems, setCartItems] = useState(initialState);

  // 제품상세페이지 => Cart 추가. 이미 담은 상품이면 amount만 증가
  const addItemToCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedItems;
      // 이미 카트에 담긴 상품일 경우 : 수량 amount만큼 증가
      if (existingCartItemIndex !== -1) {
        const existingCartItem = prevState.items[existingCartItemIndex];
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + item.amount,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex] = updatedCartItem;
      } else {
        // 카트에 없는 상품일 경우 : 새 요소를 배열에 추가
        updatedItems = [...prevState.items, item];
      }
      const updatedPrice = prevState.totalPrice + item.price * item.amount;
      return { items: updatedItems, totalPrice: updatedPrice };
    });
  };

  /*
   * Cart 컴포넌트에서 사용할 함수들
   */

  // Cart컴포넌트에서, 담은 상품일때 amount+1씩 수량 증가
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
        const updatedPrice = prevState.totalPrice + item.price * item.amount;
        return { items: updatedItems, totalPrice: updatedPrice };
      }
    });
  };

  // Cart컴포넌트에서, 담은 상품일때 amount-1씩, 1이면 상품 제거
  const delItemFromCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedItems;
      // 이미 카트에 담긴 상품일 경우 :
      if (existingCartItemIndex !== -1) {
        const existingCartItem = prevState.items[existingCartItemIndex];
        let updatedCartItem;
        // 1보다 크면 -1
        if (existingCartItem.amount > 1) {
          updatedCartItem = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1,
          };
          updatedItems = [...prevState.items];
          updatedItems[existingCartItemIndex] = updatedCartItem;
        } else {
          // 1개보다 작아진다면, 삭제 (삭제하려는 항목 외의 배열 반환)
          updatedItems = prevState.items.filter(
            (cartItem) => cartItem.id !== item.id
          );
        }
        const updatedPrice = prevState.totalPrice - item.price;
        return { items: updatedItems, totalPrice: updatedPrice };
      } else {
        // 카트에 기존 없던 상품일 경우 : 작동x
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
