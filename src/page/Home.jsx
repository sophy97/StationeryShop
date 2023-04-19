/**DAta.json의 DUMMY_DATA에서 구매량(purchase) 순으로 내림차순, top5만 표시하기 */

import React from "react";
import classes from "./Home.module.css";
import data from "../Data.json";

const Home = () => {
  const dummySort = data.DUMMY_PRODUCTS.sort((a, b) => b.purchase - a.purchase);
  const best_5 = dummySort.slice(0, 5);

  const bestList = best_5.map((best) => (
    <div key={best.id} className={classes.list_box}>
      <span className={classes.title}><p>{best.name}</p></span>
      <span><p>{best.price}</p></span>
      판매량: <span style={{ color: "brown" }}>{best.purchase}</span>
    </div>
  ));

  return (
    <section className={classes.wrapper}>
      <h2>BEST LIST</h2>
      {bestList}
    </section>
  );
};

export default Home;
