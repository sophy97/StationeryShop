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
  const cartCtx = useContext(CartContext);
  const [amount, setAmount] = useState("1");

  const onaddCartHandler = (e) => {
    if (userName) {
      cartCtx.addItemToCart({ ...selectedProduct, amount: +amount });
      e.preventDefault();
      cartCtx.modalOpenHandler();
    } else {
      alert("로그인 후 상품을 추가해 주세요");
      navigator("/login");
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.img_wrap}>
        <img src={process.env.PUBLIC_URL + `/${selectedProduct.img}`}></img>
      </div>
      <h2>{selectedProduct.name}</h2>
      <span className={classes.description}>{selectedProduct.description}</span>
      <span>
        <p>가격: {formattedPrice(selectedProduct.price)}</p>
        <p>판매량: {selectedProduct.purchase}</p>
      </span>
      <br />
      <span>
        <button onClick={onaddCartHandler} className={classes.addCart}>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
        </button>
      </span>
    </div>
  );
};
export default ShopDetail;
