import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import PostSection from "./components/PostSection";
import background from "../../assets/images/background.jpeg";
import { Route } from "react-router-dom";

const TopBodyWrapper = styled.div`
  height: 30vh;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 1)
    ),
    url(${background});
`;

const index = () => {
  return (
    <>
      <Container>
        <PostSection />
      </Container>
    </>
  );
};

export default index;
