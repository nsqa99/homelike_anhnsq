import React from "react";
import { Container } from "reactstrap";
import DetailHeader from "./components/DetailHeader.js";
import DetailBody from "./components/body";
import { shortAddress } from "../../utils/index.js";

const PostDetails = ({ match: { params } }) => {
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
      <DetailBody post={post} />
    </Container>
  );
};
export default PostDetails;
