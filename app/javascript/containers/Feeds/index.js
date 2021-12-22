import React from "react";
import { Col, Container, Row } from "reactstrap";
import PostCreateModal from "./components/PostCreateModal";
import PostSection from "./components/PostSection";
import RightPanel from "./components/RightPanel";

const index = () => {
  return (
    <Container className="p-3">
      <Row className="mt-5">
        <Col
          sm="12"
          md="7"
          lg="8"
          className="d-flex flex-column align-items-center mt-4"
        >
          <PostCreateModal />
          <PostSection />
        </Col>
        <Col sm="6" md="5" lg="4">
          <RightPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default index;
