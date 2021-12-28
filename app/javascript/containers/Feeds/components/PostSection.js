import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "reactstrap";
import styles from "../styles/post-section.module.scss";
import { RouterLink } from "../../../components/custom/RouterLink";
import Post from "../../../components/Post";
import DefaultAvatar from "../../../constants/images/DefaultAvatar.png";

const PostSection = ({ username, posts }) => {
  return (
    <>
      {!_.isEmpty(posts) ? (
        posts.map((post) => {
          const likeUsers = post.like_users
          const isLiked = likeUsers.find(user => user.username === username);

          return (
            <Post
              key={post.id}
              post={post}
              style={{ width: "80%", margin: "0 auto 30px" }}
              isLiked={isLiked}
            />
          );
        })
      ) : (
        <span className="fs-5 fw-bold">No posts found</span>
      )}
    </>
  );
};

export default CSSModules(PostSection, styles, { allowMultiple: true });
