import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { useSelector } from "react-redux";

export const getBasketTotal = (basket) => {
  basket?.reduce((amount, item) => item.price + amount, 0);
};

const Subtotal = () => {
  const basket = useSelector(({ items: { basket } }) => basket);

  return (
    <div styleName="subtotal">
      <CurrencyFormat
        renderText={(value) => {
          return (
            <>
              <p>
                ( Subtotal {basket.length} items ) :{" "}
                <strong>{`${value}`}</strong>
              </p>
              <small styleName="subtotal__gift">
                <input type="checkbox" /> This order contains
              </small>
            </>
          );
        }}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button>Proceed to checkout</button>
    </div>
  );
};
export default CSSModules(Subtotal, style);
