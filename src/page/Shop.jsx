/** Goods page : 상품 카드형태 출력, 장바구니에 추가 */
import React from "react";
import data from "../Data.json";
import classes from "./Shop.module.css";
import ProductItem from "../components/Products/Item/ProductItem";
const Shop = () => {
  const productList = data.DUMMY_PRODUCTS.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));
  return <ul className={classes.products}>{productList}</ul>;
};

export default Shop;
