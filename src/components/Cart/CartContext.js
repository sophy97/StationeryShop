/**Cart에 담을 product에 접근하기 위한 State 전역 관리 */
import { createContext, useState } from "react";

// createContext 함수를 사용해 Context 객체 생성
const CartContext = createContext();

// CartProvider 컴포넌트를 생성
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({
    items: [],
    totalAmount: 0,
  });

  // 수량: 상세페이지 > 장바구니 추가. 같은 상품이면 amount만 증가
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

      const updatedAmount = prevState.totalAmount + item.price * item.amount;

      return { items: updatedItems, totalAmount: updatedAmount };
    });
  };

  // Cart컴포넌트에서, 수량 같은 상품일때 amount 1씩 수량 증가
  const addItemInCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedItems;
      if (existingCartItemIndex !== -1) {
        const existingCartItem = prevState.items[existingCartItemIndex];
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex] = updatedCartItem;
        const updatedAmount = prevState.totalAmount + existingCartItem.price;
        return { items: updatedItems, totalAmount: updatedAmount };
      } else {
        updatedItems = [...prevState.items, item];
        const updatedAmount = prevState.totalAmount + item.price;
        return { items: updatedItems, totalAmount: updatedAmount };
      }
    });
  };

  // Cart컴포넌트에서 수량 1씩 줄이기(가격주의), amount가 0이 되면 상품제거
  const delItemFromCart = (item) => {
    setCartItems((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedItems;
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

        const updatedAmount = prevState.totalAmount - item.price;

        return { items: updatedItems, totalAmount: updatedAmount };
      } else {
        return prevState;
      }
    });
  };

  const cartContextValue = {
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
    addItem: addItemToCart,
    addCartCount: addItemInCart,
    delCartCount: delItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
