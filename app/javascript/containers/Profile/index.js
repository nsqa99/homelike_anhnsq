import React from "react";
import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import PostSection from "./components/PostSection";
import background from "../../assets/images/background.jpeg";
import { Route, useParams } from "react-router-dom";
import User from "../../components/User";
import RightPanel from "./components/RightPanel";

const Profile = () => {
  const params = useParams();
  const user = {
    id: 1,
    username: "nsqa99",
    user_full_name: "Anh Nguyen Sy Quang",
    created_at: "2021-12-12",
    email: "test@example.com",
    address: "HN, VN",
    follower_count: 100,
    following_count: 1000
  };

  return (
    <Container className="p-5">
      <User user={user} />
      <Row className="mt-5">
        <Col xs="12" md="7" lg="8" className="d-flex flex-column align-items-center mt-4">
          <PostSection />
        </Col>
        <Col xs="6" md="5" lg="4">
          <RightPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
