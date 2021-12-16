import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./SubTotal.js";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { useSelector } from "react-redux";

const Checkout = () => {
  const basket = useSelector(({ items: { basket } }) => basket);
  return (
    <div styleName="checkout">
      <div styleName="">
        <img
          styleName="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
          alt="ad"
        />
        {basket?.length === 0 ? (
          <div>
            <h2>Your shopping basket is empty</h2>
            <p>
              You have no items in your basket. To buy one or add item to basket
              click the add to basket button
            </p>
          </div>
        ) : (
          <div>
            <h2 styleName="checkout__title">Your shopping basket</h2>
            {basket.length > 0 &&
              basket.map((product) => {
                return <CheckoutProduct product={product} />;
              })}
          </div>
        )}
      </div>
      {basket?.length > 0 && (
        <div styleName="">
          <Subtotal />
        </div>
      )}
    </div>
  );
};
export default CSSModules(Checkout, style);
