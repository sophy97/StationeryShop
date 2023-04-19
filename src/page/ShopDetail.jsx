/**id값 비교를 통해 사용자가 클릭한 제품의 상세페이지 구성 */
import React from "react";
import { useParams } from "react-router-dom";
import data from "../Data.json";

const ShopDetail = () => {
  const { id } = useParams();
  const selectedGoods = data.DUMMY_PRODUCTS.find((goods) => goods.id === id) || null;

  // 위 find메서드는 아래 for문과 동일
  /*
  let target;
  for (let i = 0; i < data.DUMMY_GOODS.length; i++) {
    if (data.DUMMY_GOODS[i].id === id) {
      target = data.DUMMY_GOODS[i];
    }
  } */

  return (
    <div>
      {selectedGoods && selectedGoods.name}
      test: {id}
      
    </div>
  );
};

export default ShopDetail;
