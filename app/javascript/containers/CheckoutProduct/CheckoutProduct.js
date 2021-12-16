import React from "react";
import CSSModules from "react-css-modules";
import { useDispatch } from "react-redux";
import style from "./style.module.scss";
import DefaultImage from "constants/images/DefaultImage.png";

const CheckoutProduct = ({ product }) => {
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: product.id,
    });
  };
  return (
    <div styleName="checkoutProduct">
      <img src={product.images[0] || DefaultImage} alt={product.description} />
      <div styleName="checkoutProduct__info">
        <p styleName="checkoutProduct__title">{product.description}</p>
        <p styleName="">
          <small>$</small>
          <strong>{product.price}</strong>
        </p>
        {/* <div styleName="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((index) => (
              <p key={index}>star</p>
            ))}
        </div> */}
        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
};
export default CSSModules(CheckoutProduct, style);
