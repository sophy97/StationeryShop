/**id값 비교를 통해 사용자가 클릭한 제품의 상세페이지 구성 */
import React from "react";
import { useParams } from "react-router-dom";
import data from "../Data.json";
import classes from "./ShopDetail.module.css";

const ShopDetail = () => {
  const { id } = useParams();
  const selectedProduct =
    data.DUMMY_PRODUCTS.find((product) => product.id === parseInt(id)) || null;

  console.log(selectedProduct);
  return (
    <div className={classes.wrapper}>
      test: {id}
      <div className={classes.img_wrap}>
        <img src={selectedProduct.img}></img>
      </div>
      <h3>{selectedProduct.name}</h3>
      <span>{selectedProduct.description}</span>
      <span>
        <p>가격: {selectedProduct.price}</p>
        <p>판매량: {selectedProduct.purchase}</p>
      </span>
    </div>
  );
};

export default ShopDetail;
