import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CSSModules from "react-css-modules";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, FormGroup, Container, Button } from "reactstrap";
import styles from "../styles/user-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import RightPanel from "./RightPanel";
import { RouterLink } from "../../../components/custom/RouterLink";
import UserItem from "../../../components/UserItem";
import { searchUser } from "../../../redux/user/user.action";

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const UserSection = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.listES.data);
  const authData = useSelector((state) => state.auth.data);
  const { state: { query } } = useLocation();
  useEffect(() => {
    if (query) {
      const data = {
        search_text: query,
      };
      dispatch(searchUser(data));
    } else {
      dispatch(searchUser(""));
    }
  }, []);

  return (
    <Container fluid styleName="user__container">
      <Container>
        <Wrapper>
          {users && (users.length > 0 ? (
            users.map((user) => {
              if (user.username === authData.username) {
                return null;
              }
              return (
                <div className="mt-3">
                  <UserItem
                    key={user.id}
                    user={user}
                    currentUser={authData.username}
                  />
                </div>
              );
            })
          ) : (
            <span className="fs-3 fw-bold">No results found</span>
          ))}
        </Wrapper>
        {/* <Row className="mt-5">
          <Col
            sm="12"
            md="7"
            lg="8"
            className="d-flex flex-column align-items-center mt-4"
          ></Col>
          <Col xs="6" md="5" lg="4">
            <RightPanel />
          </Col>
        </Row> */}
      </Container>
    </Container>
  );
};

export default CSSModules(UserSection, styles, { allowMultiple: true });
