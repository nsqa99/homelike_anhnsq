import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import PostSection from "./components/PostSection";
import background from "../../assets/images/background.jpeg";
import { Route, useParams } from "react-router-dom";
import User from "../../components/User";
import RightPanel from "./components/RightPanel";
import { useDispatch, useSelector } from "react-redux";
import { searchItem } from "../../redux/item/item.action";
import { getAllPostByUsername } from "../../redux/post/post.action";
import NotificationToast from "../../components/Toast";

const Profile = () => {
  const params = useParams();
  const items = useSelector((state) => state.items.list.data);
  const postDatas = useSelector((state) => state.posts.list);
  const authData = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();
  const itemParams = {
    page: 1,
    page_size: 3,
    sort: [["rate", "desc"]],
    filters: [{ field: "merchant.user.username", value: params.username }],
  };

  const postParams = {
    page: 1,
    page_size: 10,
  };

  useEffect(() => {
    dispatch(searchItem("", itemParams));
    dispatch(getAllPostByUsername(params.username, postParams));
  }, []);

  return (
    <Container className="p-5">
      <NotificationToast />
      {authData && (
        <>
          <User username={params.username} currentUser={authData.username} />
          <Row className="mt-5">
            <Col
              xs="12"
              lg="8"
              className="d-flex flex-column mt-4 order-2 order-lg-1"
            >
              <PostSection
                username={authData.username}
                posts={postDatas.list}
              />
            </Col>
            <Col xs="12" lg="4" className="order-1 order-lg-2">
              <RightPanel items={items} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Profile;
