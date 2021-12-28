import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import styles from "../styles/post-section.module.scss";
import { RouterLink } from "../../../components/custom/RouterLink";
import Post from "../../../components/Post";
import DefaultAvatar from "../../../constants/images/DefaultAvatar.png";
import { getAllPost } from "../../../redux/post/post.action";

// const posts = [
//   {
//     id: 1,
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
//     likes: 100,
//     shares: 12,
//     user: {
//       username: "nsqa99",
//       user_full_name: "Anh Nguyen Sy Quang",
//     },
//     images: [
//       DefaultAvatar,
//       DefaultAvatar,
//       DefaultAvatar,
//     ],
//     created_at: "2021-12-21",
//   },
//   {
//     id: 2,
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
//     likes: 100,
//     shares: 12,
//     user: {
//       username: "nsqa99",
//       user_full_name: "Anh Nguyen Sy Quang",
//     },
//     images: [],
//     created_at: "2021-12-21",
//   },
//   {
//     id: 3,
//     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
//     likes: 100,
//     shares: 12,
//     user: {
//       username: "nsqa99",
//       user_full_name: "Anh Nguyen Sy Quang",
//     },
//     images: [],
//     created_at: "2021-12-21",
//   },
// ];

const PostSection = () => {
  const postDatas = useSelector((state) => state.posts.list);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  return (
    <>
      {!_.isEmpty(postDatas?.list) ? (
        postDatas?.list.map((post) => {
          console.log(post)
          return (
            <Post
              key={post.id}
              post={post}
              style={{ width: "80%", margin: "0 auto 30px" }}
            />
          );
        })
      ) : (
        <span className="fs-5 fw-bold">No posts found</span>
      )}
      {}
    </>
  );
};

export default CSSModules(PostSection, styles, { allowMultiple: true });
