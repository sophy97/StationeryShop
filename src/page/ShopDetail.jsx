/** Shop에서 카드 형태로 나열된 각 제품의 상세 페이지 구성하는 컴포넌트
 *  각 상품을 카트에 담는 기능 추가 : 카트에 담기 위한 input modal
 */
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../Data.json";
import classes from "./ShopDetail.module.css";
import { CartContext } from "../components/Cart/CartContext";
import { formattedPrice } from "./../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ShopDetail = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const selectedProduct =
    data.DUMMY_PRODUCTS.find((product) => product.id === parseInt(id)) || null;
  // localStorage에 저장된 user 있다면 이름 불러오기
  const userName = localStorage.getItem("user_name");
  const [cartInputOpen, setCartInputOpen] = useState(false);

  const onaddCartHandler = () => {
    if (userName) {
      setCartInputOpen(true);
    } else {
      alert("로그인 후 상품을 추가해 주세요!");
      navigator("/login");
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.img_wrap}>
        <img src={`/${selectedProduct.img}`}></img>
      </div>
      <h2>{selectedProduct.name}</h2>
      <span>{selectedProduct.description}</span>
      <span>
        <p>가격: {formattedPrice(selectedProduct.price)}</p>
        <p>판매량: {selectedProduct.purchase}</p>
      </span>
      <br />
      <span>
        <button onClick={onaddCartHandler} className={classes.addCart}>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
        </button>
        {cartInputOpen && <CartInput selectedProduct={selectedProduct} setCartInputOpen={setCartInputOpen} />}
      </span>
    </div>
  );
};
export default ShopDetail;

// Cart(modal)에 담을 정보를 작성할 CartInput컴포넌트
const CartInput = (props) => {
  const { name, price } = props.selectedProduct;
  const [amount, setAmount] = useState("1");
  const cartCtx = useContext(CartContext);

  const CartHandler = (e) => {
    // amount를 number로 변환 (cart컴포넌트에서 누적하기위해)
    cartCtx.addItem({ ...props.selectedProduct, amount: +amount });
    e.preventDefault();
    alert("장바구니에 상품이 추가되었습니다");
    props.setCartInputOpen(false);
  };

  return (
    <form onSubmit={CartHandler} className={classes.form_wrap}>
      <input
        className={classes.inputBox}
        type="number"
        min="1"
        max="100"
        step="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className={classes.toCart}>상품 추가</button>
      <br />
      <div className={classes.orderInfo}>
        <span>상품명:{name}, 가격:{price.toLocaleString()} / 수량:{amount}개</span>
      </div>
    </form>
  );
};
