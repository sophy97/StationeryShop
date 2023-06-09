/** 상품 출력 페이지 상단, 간단한 쇼핑몰 소개 */
import React from "react";
import classes from "./ProductIntro.module.css";
import { useNavigate } from "react-router-dom";

const ProductIntro = () => {
  const navigator = useNavigate();
  return (
    <>
      <section className={classes.intro}>
        <h2>이번 주 인기 상품</h2>
        <span
          onClick={() => {
            navigator("/shop");
          }}
        >
          전체 상품 보기
        </span>
        <br />
        다양한 문구 용품을 경제적인 가격에 쇼핑하세요!
        <br />
        &copy; Stationery Station
      </section>
    </>
  );
};

export default ProductIntro;
