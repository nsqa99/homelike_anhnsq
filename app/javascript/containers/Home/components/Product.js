import React from "react";
import CSSModules from "react-css-modules";
import style from "../styles/product.module.scss";
import DefaultImage from "constants/images/DefaultImage.png";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      product,
    });
  };

  return (
    <div styleName="product">
      <div styleName="product__info">
        <p>{product.description}</p>
        <p styleName="product__price">
          <small>$</small>
          <strong>{product.price}</strong>
        </p>
        <div styleName="product__rating">
          {/* {Array(rating)
            .fill()
            .map((index) => (
              <i key={index} class="fa fa-star"></i>
            ))} */}
        </div>
      </div>
      <div styleName="img-wrapper">
        <img
          src={product.images[0] || DefaultImage}
          alt={product.description}
        />
      </div>
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default CSSModules(Product, style);
