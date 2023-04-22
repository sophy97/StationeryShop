/**
 * Shop Page 컴포넌트의 자식, 출력 형태 구현 & id값으로 상세 페이지 이동
 */
import { useNavigate } from "react-router-dom";
import classes from "./ProductItem.module.css";
import { formattedPrice } from "../../../common";

const ProductItem = (props) => {
  // 부모 Shop에서 생성한 product배열 전체를 받아와 구조분해 할당
  const { id, name, img, purchase, price } = props.product;
  const navigate = useNavigate();
  const toDeatilPage = () => {
    // 클릭 이벤트 발생 시 /shop/${id} 경로로 이동하는 함수
    navigate(`/shop/${id}`);
  };

  return (
    <li onClick={toDeatilPage} className={classes.goods}>
      <div className={classes.img_wrap}>
        <img src={img}></img>
      </div>
      <h3>{name}</h3>
      <span>판매량:{purchase}</span>
      <span>
        <p className={classes.price}>{formattedPrice(price)}</p>
      </span>
    </li>
  );
};

export default ProductItem;
