import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import DefaultAvatar from "constants/images/DefaultAvatar.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { RouterLink } from "../custom/RouterLink";
import { formatDate } from "../../utils";
import styled from "styled-components";
import { MySlider } from "../Slider";
import { isEqual } from "lodash";
import { Button } from "reactstrap";
import { likePost, unlikePost } from "../../redux/post/post.action";
import { useHistory } from "react-router-dom";
import ItemAttach from "../../containers/ItemDetails/components/ItemAttach";
import Avatar from "../../constants/images/Avatar.png";
import { formatDateTime } from "../../utils";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";

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

const Post = ({
  post,
  rightPanel,
  style,
  detail,
  imageSize,
  profile,
  isLiked,
  currentUser,
}) => {
  const [displayLong, toggleDisplayLong] = useState(false);
  const [editOpen, setEdit] = useState(false);
  const handleReadMore = () => {
    toggleDisplayLong(!displayLong);
  };
  const toggleEditModal = () => {
    setEdit(!editOpen);
  }
  const dispatch = useDispatch();

  const handleLikeClick = () => {
    if (isLiked) {
      dispatch(unlikePost(post.owner.username, post.id));
    } else {
      dispatch(likePost(post.owner.username, post.id));
    }
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
        <div
          styleName="post"
          style={{ ...style }}
          className={rightPanel ? "mb-4" : ""}
        >
          <div className="d-flex align-items-center">
            <RouterLink to={ownerPath}>
              <img
                src={post.owner.avatar_url || Avatar}
                className="rounded-circle"
                styleName="post__avatar"
              />
            </RouterLink>
            <div>
              <RouterLink to={ownerPath}>
                <div styleName="post__user">{post.owner?.user_full_name}</div>
              </RouterLink>
              <div styleName="post__created">
                {post.created_at && formatDateTime(post.created_at)}
              </div>
            </div>
            {post.owner.username === currentUser && (
              <div className="d-flex align-items-center ms-auto me-2">
                <EditModal post={post} username={currentUser} />
                <DeleteModal postId={post.id} username={currentUser} />
              </div>
            )}
          </div>
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
          {post.items && post.items.length > 0 && (
            <ItemAttach item={post.items[0]} />
          )}
          <div className="d-flex align-items-center mb-3 justify-content-between w-100">
            <div className="ms-3 d-flex align-items-center">
              {isLiked ? (
                <FavoriteIcon
                  onClick={handleLikeClick}
                  styleName="icon"
                  className="text-danger"
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleLikeClick}
                  styleName="icon"
                />
              )}
              <span styleName="post__likeShare">{post.likes_count}</span>

              <RouterLink to={detailPath}>
                <ChatIcon styleName="icon" className="ms-3" />
                <span styleName="post__likeShare">{post.comments_count}</span>
              </RouterLink>

              {/* <ShareIcon className="ms-2" styleName="icon" />
                <span styleName="post__likeShare">{post.shares}</span> */}
            </div>
          </div>

          {/* <div
            className="d-flex align-items-center w-100 flex-wrap"
            styleName="post__create"
          >
            {profile && (
              <Button color="danger" outline className="ms-auto me-4">
                Remove
              </Button>
            )}
          </div> */}
        </div>
      ) : (
        "Not found"
      )}
    </>
  );
};

export default CSSModules(Post, style, { allowMultiple: true });
