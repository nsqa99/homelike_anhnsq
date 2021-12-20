import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { Col, Row, FormGroup, Container, Button } from "reactstrap";
import styles from "../styles/user-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import RightPanel from "./RightPanel";
import { RouterLink } from "../../../components/custom/RouterLink";
import UserItem from "../../../components/UserItem";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const users = [
  {
    id: 1,
    username: "nsqa99",
    user_full_name:
      "Anh Nguyen Sy QuangAnh Nguyen Sy QuanAnh Nguyen Sy QuanAnh Nguyen Sy Quan",
    created_at: "2021-12-12",
    email: "test@example.com",
    address: "HN, VN",
    follower_count: 100,
    following_count: 1000,
  },
  {
    id: 2,
    username: "nsqa",
    user_full_name: "Lorem 1",
    created_at: "2021-12-12",
    email: "test1@example.com",
    address: "HN, VN",
    follower_count: 100,
    following_count: 1000,
  },
  {
    id: 3,
    username: "nsqa",
    user_full_name: "Lorem 345",
    created_at: "2021-12-12",
    email: "test2@example.com",
    address: "HN, VN",
    follower_count: 100,
    following_count: 1000,
  },
];

const UserSection = () => {
  return (
    <Container fluid styleName="user__container">
      <Container>
        <Row className="mt-5">
          <Col
            sm="12"
            md="7"
            lg="8"
            className="d-flex flex-column align-items-center mt-4"
          >
            {users.length
              ? users.map((user) => {
                  return <UserItem key={user.id} user={user} />;
                })
              : "No results found"}
          </Col>
          <Col xs="6" md="5" lg="4">
            <RightPanel />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CSSModules(UserSection, styles, { allowMultiple: true });
