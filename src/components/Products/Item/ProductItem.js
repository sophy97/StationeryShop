import { useNavigate } from "react-router-dom";
import classes from "./ProductItem.module.css";
import { formattedPrice } from "../../../common";

const ProductItem = (props) => {
  const { id, name, img, description, price } = props.product;
  const navigate = useNavigate();
  const toDeatilPage = () => {
    // 각 id값으로 이동하기 위해 id로 받아옴
    navigate(`/shop/${id}`);
  };

  return (
    <li onClick={toDeatilPage} className={classes.goods}>
      <div className={classes.img_wrap}>
        <img src={img}></img>
      </div>
      <h3>{name}</h3>
      <span>{description}</span>
      <span>
        <p className={classes.price}>{formattedPrice(price)}</p>
      </span>
    </li>
  );
};

export default ProductItem;
