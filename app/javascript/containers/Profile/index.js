import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import PostSection from "./components/PostSection";
import background from "../../assets/images/background.jpeg";
import { Route } from "react-router-dom";

const index = () => {
  return (
    <>
      <PostSection />
    </>
  );
};

export default index;
