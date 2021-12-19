import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { Col, Row, FormGroup, Container, Button } from "reactstrap";
import styles from "../styles/post-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import RightPanel from "./RightPanel";
import { RouterLink } from "../../../components/custom/RouterLink";
import Post from "../../../components/Post";
import User from "../../../components/User";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

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
  {
    id: 2,
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
  {
    id: 3,
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

const PostSection = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Container fluid styleName="post__container">
      <Container>
        <User user={user} />
        
        <Row className="mt-5">
          <Col xs="12" md="7" lg="8" className="d-flex flex-column align-items-center mt-4">
            {posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  detail={true}
                  style={{ width: "80%", margin: "0 auto 30px" }}
                />
              );
            })}
          </Col>
          <Col xs="6" md="5" lg="4">
            <RightPanel />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CSSModules(PostSection, styles, { allowMultiple: true });
