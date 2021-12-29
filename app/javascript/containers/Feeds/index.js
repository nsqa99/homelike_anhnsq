import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import PostCreateModal from "./components/PostCreateModal";
import PostSection from "./components/PostSection";
import RightPanel from "./components/RightPanel";
import { getAllPost } from "../../redux/post/post.action";
import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";

const index = () => {
  const postDatas = useSelector((state) => state.posts.list);
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  return (
    <>
      {postDatas && !isEqual(postDatas.list, []) && (
        <Container className="p-3">
          <Row className="mt-5">
            <Col
              sm="12"
              md="7"
              lg="8"
              className="d-flex flex-column align-items-center mt-4"
            >
              {authData?.isAuthenticated ? (
                <PostCreateModal username={authData.username} />
              ) : (
                "Sign in to create post"
              )}
              <PostSection username={authData.username} posts={postDatas.list} />
            </Col>
            <Col sm="6" md="5" lg="4">
              <RightPanel username={authData.username} populars={postDatas.popular_posts} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default index;
