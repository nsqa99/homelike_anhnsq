import React from "react";
import { Container } from "reactstrap";
import DetailBody from "./components/body";
import { goBack, shortAddress } from "../../utils/index.js";
import { useHistory, useParams } from "react-router-dom";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";
import { getOnePost, resetPostState } from "../../redux/post/post.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isEqual } from "lodash";

const PostDetails = ({ location }) => {
  const params = useParams();
  const post = useSelector((state) => state.posts.post);
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPostState());
    dispatch(getOnePost(params.id));
  }, [params.id]);

  return (
    <>
      {!isEqual(post, {}) ? (
        <Container>
          <DetailBody
            isAuthenticated={authData?.isAuthenticated}
            currentUser={authData?.username}
            post={post}
            location={location}
          />
        </Container>
      ) : (
        null
      )}
    </>
  );
};
export default PostDetails;
