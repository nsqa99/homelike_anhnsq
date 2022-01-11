import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import PostCreateModal from "./components/PostCreateModal";
import PostSection from "./components/PostSection";
import RightPanel from "./components/RightPanel";
import { getAllPost } from "../../redux/post/post.action";
import { useDispatch, useSelector } from "react-redux";
import { includes, isEmpty, isEqual } from "lodash";
import NotificationToast from "../../components/Toast";

const index = () => {
  const postDatas = useSelector((state) => state.posts.list);
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  return (
    <>
      {postDatas && !isEmpty(postDatas.list) && (
        <Container className="p-3">
          <NotificationToast />
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
                <div className="fs-4 mb-5 p-2 border border-danger border-2 rounded fw-bold">
                  Sign in to create a post
                </div>
              )}
              <PostSection
                username={authData.username}
                posts={postDatas.list.filter(
                  (post) =>
                    includes(post.owner.list_follower, authData.username) ||
                    post.owner.username === authData.username
                )}
              />
            </Col>
            <Col sm="6" md="5" lg="4">
              <RightPanel
                username={authData.username}
                populars={postDatas.popular_posts}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default index;
