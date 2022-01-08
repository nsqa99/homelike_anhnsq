import React, { useState } from "react";
import CSSModules from "react-css-modules";
import { useSelector } from "react-redux";
import styles from "../styles/post-section.module.scss";
import Post from "../../../components/Post";
import User from "../../../components/User";

const PostSection = ({ username, posts }) => {
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          const likeUsers = post.like_users;
          const isLiked = likeUsers.find((user) => user.username === username);

          return (
            <Post key={post.id} post={post} detail={true} isLiked={isLiked} />
          );
        })
      ) : (
        <span className="fs-5 fw-bold ms-3">No posts found</span>
      )}
    </>
  );
};

export default CSSModules(PostSection, styles, { allowMultiple: true });
