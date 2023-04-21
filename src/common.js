// toLocaleString() 함수: 가격 천 단위로 구분된 템플릿으로 변환
export const formattedPrice = (price) => {
  return price.toLocaleString()+"원";
};
