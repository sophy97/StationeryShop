/** Shop page : 상품 목록을 카드형태 출력 & 상품명 검색 & 정렬기준 필터 */
import React, { useState } from "react";
import data from "../Data.json";
import classes from "./Shop.module.css";
import ProductItem from "../components/Products/Item/ProductItem";
const Shop = () => {
  // 로컬 Data.json에서 전체 상품 data받기 : 초기값
  const [productList, setProductList] = useState(
    data.DUMMY_PRODUCTS.map((product) => (
      //product배열 전체를 props로 넘김
      <ProductItem key={product.id} product={product} />
    ))
  );

  // 상품 검색 기능을 위한 state
  const [filterText, setFilterText] = useState("");

  // 필터1> 가격 낮은 상품부터 정렬할 버튼
  const sortFilterHandler = () => {
    const sortedList = [...productList].sort(
      (a, b) => a.props.product.price - b.props.product.price
    );
    setProductList(sortedList);
  };

  // 필터2> Home에서 구현한 판매량순 정렬
  const sortFilterHandler2 = () => {
    const sortedList = [...productList].sort(
      (a, b) => b.props.product.purchase - a.props.product.purchase
    );
    setProductList(sortedList);
  };

  // 상품검색 onChange함수
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  // 검색기능 핸들러 함수
  const filterTextHandler = () => {
    const filteredList = data.DUMMY_PRODUCTS.filter((product) =>
      product.name.includes(filterText)
    ).map((product) => <ProductItem key={product.id} product={product} />);
    setProductList(filteredList);
    setFilterText("");
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
        <button className={classes.searchBtn} onClick={filterTextHandler}>
          {filterText === "" ? "초기화" : "검색"}
        </button>
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
