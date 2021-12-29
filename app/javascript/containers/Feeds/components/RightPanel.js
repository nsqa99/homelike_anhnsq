import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../styles/right-panel.module.scss";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../../../components/Post";
import { isEmpty } from "lodash";

const PostWrapper = styled.div`
  margin-top: 30px;
`;

const RightPanel = ({ username, populars }) => {
  const posts = populars;

  return (
    <PostWrapper>
      <div styleName="post__title" className="mb-5">
        Popular Posts
      </div>
      {!isEmpty(posts) &&
        posts.map((post) => {
          const isLiked = post.like_users.find(
            (user) => user.username === username
          );

          return <Post key={post.id} isLiked={!!isLiked} post={post} rightPanel={true} />;
        })}
    </PostWrapper>
  );
};

export default CSSModules(RightPanel, style);
