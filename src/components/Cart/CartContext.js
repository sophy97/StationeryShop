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

  // 장바구니에 추가. +같은 상품이면 amount만 증가
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

      const updatedTotalAmount =
        prevState.totalAmount + item.price * item.amount;

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    });
    alert("장바구니에 상품이 추가되었습니다")
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevState) => {
      const itemToRemove = prevState.items.find((item) => item.id === id);
      const updatedItems = prevState.items.filter((item) => item.id !== id);
      const updatedTotalAmount =
        prevState.totalAmount - itemToRemove.price * itemToRemove.amount;
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    });
  };

  const cartContextValue = {
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
