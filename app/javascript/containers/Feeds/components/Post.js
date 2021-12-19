import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "../styles/post.module.scss";
import DefaultAvatar from "constants/images/DefaultAvatar.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import { RouterLink } from "../../../components/custom/RouterLink";
import { formatDate } from "../../../utils";
import { Col, Row } from "reactstrap";
import PostDetails from "../../PostDetails";

const Post = ({ post, rightPanel, style, slider, detail }) => {
  const dispatch = useDispatch();
  const [displayLong, toggleDisplayLong] = useState(false);
  const handleReadMore = () => {
    toggleDisplayLong(!displayLong);
  };

  const detailPath = `/social/posts/${post.id}`;
  const ownerPath = `/social/profile/${post.user.username}`;

  return (
    <div styleName="post" style={{ ...style }}>
      <div styleName="img-wrapper">
        <RouterLink to={detailPath} className="w-100">
          {slider || (
            <img src={post.images[0] || DefaultAvatar} alt={post.id} />
          )}
        </RouterLink>
      </div>

      <RouterLink to={ownerPath} styleName="post__user">
        <PersonIcon styleName="icon__user" />
        {`${post.user.user_full_name}`}
      </RouterLink>

      <div styleName="post__info">
        <RouterLink to={detailPath}>
          <div styleName={displayLong || detail ? "" : "post__content"}>
            {post.content}
          </div>
        </RouterLink>
      </div>
      {!rightPanel && (
        <div className="d-flex mb-3 align-items-center justify-content-between w-100">
          <div className="ms-3">
            <FavoriteBorderIcon styleName="icon" />
            <ShareIcon className="ms-2" styleName="icon" />
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
        className="d-flex align-items-center w-100 justify-content-start"
        styleName="post__create"
      >
        <CalendarTodayIcon styleName="icon__calendar" />
        {formatDate(post.created_at)}
      </div>
    </div>
  );
};

export default CSSModules(Post, style, { allowMultiple: true });
