import React from "react";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../../../Feeds/components/Post";

const PostWrapper = styled.div`
  margin-top: 30px;
`;

const RightPanel = () => {
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

  return (
    <PostWrapper>
      <div styleName="body__title" className="mb-5">
        On Trending
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          rightPanel={true}
          style={{ marginBottom: 20 }}
        />
      ))}
    </PostWrapper>
  );
};
export default CSSModules(RightPanel, style);
