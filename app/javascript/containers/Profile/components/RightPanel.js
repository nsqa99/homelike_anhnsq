import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../styles/right-panel.module.scss";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../../../components/Post";
import Item from "../../Home/components/Item";
import { Card, CardBody, Col, Row } from "reactstrap";

const PostWrapper = styled.div`
  margin-top: 30px;
`;

const RightPanel = ({ items }) => {
  return (
    <>
      {items && items.length > 0 ? (
        <PostWrapper>
          <div styleName="post__title" className="mb-5">
            Featuring apartments
          </div>

          <div className="d-flex flex-column flex-wrap justify-content-around">
            {items?.map((item) => {
              return <Item key={item.id} item={item} />;
            })}
          </div>
        </PostWrapper>
      ) : (
        <span className="fs-5 fw-bold">No apartments found</span>
      )}
    </>
  );
};

export default CSSModules(RightPanel, style);
