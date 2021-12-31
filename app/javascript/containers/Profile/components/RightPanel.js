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

const RightPanel = ({items}) => {
  const posts = [
    {
      id: 1,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
      likes: 100,
      shares: 12,
      user: {
        username: "nsqa99",
        user_full_name: "Anh Nguyen Sy Quang",
      },
      images: [],
      created_at: "2021-12-21",
    },
  ];

  return (
    <PostWrapper>
      <div styleName="post__title" className="mb-5">
        Featuring items
      </div>
      
      <div className="d-flex flex-column flex-wrap justify-content-around">
        {
          items?.map((item) => {
            return (
              <Item key={item.id} item={item} />
            );
          })
        }
      </div>
    </PostWrapper>
  );
};

export default CSSModules(RightPanel, style);
