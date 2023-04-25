/** Shop page : 상품 목록을 카드형태 출력 & 상품명 검색 & 정렬기준 필터 */
import React, { useEffect, useState } from "react";
import data from "../Data.json";
import classes from "./Shop.module.css";
import ProductItem from "../components/Products/Item/ProductItem";

/** 로컬 Data.json에서 전체 상품 data받고 수정하는 대신,
  검색어에 해당하는 상품 목록 생성하는 함수  */
const filterProducts = (filterText, sortType) => {
  let filteredList = data.DUMMY_PRODUCTS.filter((product) =>
    product.name.includes(filterText)
  );
  // 정렬 조건에 따라 상품 목록 정렬 :가격순, 구매순
  if (sortType === "price") {
    filteredList.sort((a, b) => a.price - b.price);
  } else if (sortType === "purchase") {
    filteredList.sort((a, b) => b.purchase - a.purchase);
  }
  // 상품 목록을 ProductItems로 변환
  const productItems = filteredList.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));
  // 변환된 ProductItem 목록 반환하고 함수 종료
  return productItems;
};

/* 상품 리스트 카드형식 보여주는 컴포넌트. 검색과 필터 기능 */
// 위에 만든 함수를 호출하면, productItems에 해당하는 값을 반환
const Shop = () => {
  // 상품 검색 기능을 위한 state
  const [productList, setProductList] = useState(filterProducts("", "default"));
  // 검색기능 onChange
  const [filterText, setFilterText] = useState("");

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
    setProductList(filterProducts(event.target.value, "default"));
  };

  // 필터1> 가격 낮은 상품부터 정렬할 버튼
  const sortFilterHandler = () => {
    setProductList(filterProducts(filterText, "price"));
  };
  // 필터2> Home에서 구현한 판매량순 정렬
  const sortFilterHandler2 = () => {
    setProductList(filterProducts(filterText, "purchase"));
  };

  return (
    <>
      <div className={classes.search_bar}>
        <input
          className={classes.search_input}
          type="text"
          placeholder="상품명 검색"
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </div>
      <button className={classes.sortBtn} onClick={sortFilterHandler}>
        낮은 가격순
      </button>
      <button className={classes.sortBtn} onClick={sortFilterHandler2}>
        판매량순
      </button>
      <ul className={classes.products}>{productList}</ul>
    </>
  );
};

export default Shop;
