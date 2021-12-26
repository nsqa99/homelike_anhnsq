import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useSelector } from "react-redux";
import Item from "../../../Home/components/Item";
import styled from "styled-components";

const ItemWrapper = styled.div`
  margin-top: 30px;
`;

const RightPanel = ({ items }) => {
  return (
    <ItemWrapper>
      <div styleName="body__title" className="mb-5">
        Apartments around
      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <Item key={item.id} item={item} style="item--no-margin" />
        ))
      ) : (
        <span className="fs-5 fw-bold">Oops! Seems like no apartment around here yet</span>
      )}
    </ItemWrapper>
  );
};
export default CSSModules(RightPanel, style);
