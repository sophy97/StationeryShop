/** 상품 출력 페이지 상단, 간단한 쇼핑몰 소개 */
import React from "react";
import classes from "./ProductIntro.module.css";

const ProductIntro = () => {
  return (
    <>
      <section className={classes.intro}>
        <h3>이번 주 인기 상품</h3>
        <hr />
        <br />
        다양한 문구 용품을 경제적인 가격에 쇼핑하세요!
        <br />
        ©️ Stationery Station
      </section>
    </>
  );
};

export default ProductIntro;
