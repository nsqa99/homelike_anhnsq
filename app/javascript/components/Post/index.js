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
import { isEqual } from "lodash";

const CustomSlider = styled.div`
  .slick-list {
    height: ${(props) => props.imageSize || "300px"};
    border-radius: 3px;

    img {
      object-fit: cover;
      min-height: ${(props) => props.imageSize || "300px"};
    }
  }
`;

const Post = ({ post, rightPanel, style, detail, imageSize }) => {
  const [displayLong, toggleDisplayLong] = useState(false);
  const handleReadMore = () => {
    toggleDisplayLong(!displayLong);
  };

  const detailPath = `/social/posts/${post?.id}`;
  const ownerPath = `/social/users/${post?.owner?.username}`;

  const carouselImages =
    post?.image_urls?.length > 0 &&
    post?.image_urls.map((image) => {
      return { key: image, altText: "Image", src: image };
    });

  return (
    <>
      {post && !isEqual(post, {}) ? (
        <div styleName="post" style={{ ...style }}>
          {carouselImages?.length > 0 && (
            <div styleName="img-wrapper">
              {!detail ? (
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
              ) : (
                <div className="w-100">
                  <CustomSlider imageSize={imageSize}>
                    <MySlider items={carouselImages} />
                  </CustomSlider>
                </div>
              )}
            </div>
          )}

          <div styleName="post__info">
            {!detail ? (
              <RouterLink
                to={{
                  pathname: detailPath,
                  state: { prevPath: location.pathname },
                }}
              >
                <div styleName={displayLong || detail ? "" : "post__content"}>
                  {post.content}
                </div>
              </RouterLink>
            ) : (
              <div styleName={displayLong || detail ? "" : "post__content"}>
                {post.content}
              </div>
            )}
          </div>
          {!rightPanel && (
            <div className="d-flex mb-3 align-items-center justify-content-between w-100">
              <div className="ms-3 d-flex align-items-center">
                <FavoriteBorderIcon styleName="icon" />
                <span styleName="post__likeShare">{post.likes}</span>
                <ShareIcon className="ms-2" styleName="icon" />
                <span styleName="post__likeShare">{post.shares}</span>
              </div>
              {post.content?.length > 200 && (
                <div
                  styleName="post__details"
                  className={detail ? "d-none" : "me-3"}
                  onClick={handleReadMore}
                >
                  {displayLong ? "Minimize" : "Read more"}
                </div>
              )}
            </div>
          )}
          <div
            className="d-flex align-items-center w-100 justify-content-start flex-wrap"
            styleName="post__create"
          >
            <CalendarTodayIcon styleName="icon__calendar" className="mb-2" />
            {post.created_at && formatDate(post.created_at)}
            <RouterLink to={ownerPath} styleName="post__user">
              <PersonIcon styleName="icon__user" />
              {`${post.owner?.user_full_name}`}
            </RouterLink>
          </div>
        </div>
      ) : (
        "Not found"
      )}
    </>
  );
};

export default CSSModules(Post, style, { allowMultiple: true });
