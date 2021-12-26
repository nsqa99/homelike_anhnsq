import React from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import styled from "styled-components";
import SearchSection from "./components/SearchSection";
import ItemSection from "./components/ItemSection";
import background from "../../assets/images/background.jpeg";

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
    <div style={{background: '#f8f9fa', height: '100vh'}}>
      <Container fluid className="p-0">
        <TopBodyWrapper>
          <SearchSection />
        </TopBodyWrapper>
      </Container>
      <ItemSection />
    </div>
  );
};

export default index;
