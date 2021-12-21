import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import DefaultAvatar from "constants/images/DefaultAvatar.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { RouterLink } from "../custom/RouterLink";
import { formatDate } from "../../utils";
import styled from "styled-components";
import { MySlider } from "../Slider";

const CustomSlider = styled.div`
  .slick-list {
    height: ${props => props.imageSize || "300px"};
    border-radius: 3px;

    img {
      object-fit: cover;
      min-height: ${props => props.imageSize || "300px"};
    }
  }
`;

const Post = ({ post, rightPanel, style, detail, imageSize }) => {
  const dispatch = useDispatch();
  const [displayLong, toggleDisplayLong] = useState(false);
  const handleReadMore = () => {
    toggleDisplayLong(!displayLong);
  };

  const detailPath = `/social/posts/${post.id}`;
  const ownerPath = `/social/users/${post.user.username}`;

  const carouselImages =
    post.images?.length > 0 &&
    post.images.map((image) => {
      return { key: image.url, altText: "Image", src: image.url };
    });

  return (
    <div styleName="post" style={{ ...style }}>
      {carouselImages?.length > 0 && (
        <div styleName="img-wrapper">
          <RouterLink
            to={{
              pathname: detailPath,
              state: { prevPath: location.pathname },
            }}
            className="w-100"
          >
            <CustomSlider imageSize={imageSize}>
              <MySlider items={carouselImages} />
            </CustomSlider>
          </RouterLink>
        </div>
      )}

      <div styleName="post__info">
        <RouterLink
          to={{ pathname: detailPath, state: { prevPath: location.pathname } }}
        >
          <div styleName={displayLong || detail ? "" : "post__content"}>
            {post.content}
          </div>
        </RouterLink>
      </div>
      {!rightPanel && (
        <div className="d-flex mb-3 align-items-center justify-content-between w-100">
          <div className="ms-3 d-flex align-items-center">
            <FavoriteBorderIcon styleName="icon" />
            <span styleName="post__likeShare">{post.likes}</span>
            <ShareIcon className="ms-2" styleName="icon" />
            <span styleName="post__likeShare">{post.shares}</span>
          </div>
          <div
            styleName="post__details"
            className={detail ? "d-none" : "me-3"}
            onClick={handleReadMore}
          >
            {displayLong ? "Minimize" : "Read more"}
          </div>
        </div>
      )}
      <div
        className="d-flex align-items-center w-100 justify-content-start flex-wrap"
        styleName="post__create"
      >
        <CalendarTodayIcon styleName="icon__calendar" className="mb-2" />
        {formatDate(post.created_at)}
        <RouterLink to={ownerPath} styleName="post__user">
          <PersonIcon styleName="icon__user" />
          {`${post.user.user_full_name}`}
        </RouterLink>
      </div>
    </div>
  );
};

export default CSSModules(Post, style, { allowMultiple: true });
