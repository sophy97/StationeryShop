/**DAta.json의 DUMMY_DATA에서 구매량(purchase) 순으로 내림차순, top5만 표시하기 */
import React, { useEffect, useRef } from "react";
import classes from "./Home.module.css";
import data from "../Data.json";
import { useNavigate } from "react-router-dom";
import ProductIntro from "../components/Products/ProductIntro";
import { formattedPrice } from "../common";

const Home = () => {
  const homeRef = useRef(null);
  const dummySort = data.DUMMY_PRODUCTS.sort((a, b) => b.purchase - a.purchase);
  const best_5 = dummySort.slice(0, 5);
  // 해당 베스트 제품의 상세페이지 id를 얻어와 이동
  const navigate = useNavigate();
  const toDeatilPage = (best) => {
    navigate(`/shop/${best.id}`);
  };

  const bestList = best_5.map((best) => (
    <div
      key={best.id}
      className={classes.list_box}
      onClick={() => {
        toDeatilPage(best);
      }}
    >
      <span>
        <h3>
          {best.name} | {formattedPrice(best.price)}
        </h3>
      </span>
      구매:<span style={{ color: "brown" }}>{best.purchase}</span>
      <hr />
    </div>
  ));

  // 맨 위에서 null로 선언되고, return에서 위치값을 받은 후
  // 다시 본 컴포넌트가 호출되면 저장해둔 위치로 이동 
  useEffect(() => {
    const refTop = homeRef.current.offsetTop;
    window.scrollTo({ top: refTop });
  }, [homeRef]);

  return (
    <section ref={homeRef}>
      <ProductIntro />
      <section className={classes.wrapper}>{bestList}</section>
    </section>
  );
};

export default Home;
