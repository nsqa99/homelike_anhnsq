import React from "react";
import { Container } from "reactstrap";
import DetailBody from "./components/body";
import { goBack, shortAddress } from "../../utils/index.js";
import { useHistory, useParams } from "react-router-dom";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";
import { getOnePost } from "../../redux/post/post.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PostDetails = ({ location }) => {
  const params = useParams();
  const post = useSelector((state) => state.posts.post);
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(resetItemState());
    dispatch(getOnePost(params.id));
  }, [params.id]);

  return (
    <Container>
      <DetailBody
        isAuthenticated={authData?.isAuthenticated}
        currentUser={authData?.username}
        post={post}
        location={location}
      />
    </Container>
  );
};
export default PostDetails;
