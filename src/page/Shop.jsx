/** Goods page : 상품 카드형태 출력, 장바구니에 추가 */
import React, { useState } from "react";
import data from "../Data.json";
import classes from "./Shop.module.css";
import ProductItem from "../components/Products/Item/ProductItem";
const Shop = () => {
  const [productList, setProductList] = useState(
    data.DUMMY_PRODUCTS.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))
  );

  // 가격 낮은 상품부터 정렬
  const filter_1 = () =>
    data.DUMMY_PRODUCTS.sort((a, b) => a.price - b.price).map((product) => (
      <ProductItem key={product.id} product={product} />
    ));

  const filterHandler = () => {
    setProductList(filter_1());
  };
  return (
    <>
      <button onClick={filterHandler}>가격 낮은순</button>
      <ul className={classes.products}>{productList}</ul>
    </>
  );
};

export default Shop;
