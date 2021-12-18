import React from "react";
import { Container } from "reactstrap";
import DetailBody from "./components/body";
import { goBack, shortAddress } from "../../utils/index.js";
import { useHistory } from "react-router-dom";

const PostDetails = ({ match: { params }, location }) => {
  const postId = params?.id;
  const post = {
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
  };

  return (
    <Container>
      {/* <DetailHeader
        id={postId}
      /> */}
      <DetailBody post={post} location={location} />
    </Container>
  );
};
export default PostDetails;
