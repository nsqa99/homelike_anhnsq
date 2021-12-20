import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { RouterLink } from "../custom/RouterLink";
import { formatDate } from "../../utils";
import { Button, Table } from "reactstrap";

const UserItem = ({ user }) => {
  const detailPath = `/social/users/${user.username}`;

  return (
    <div styleName="user" style={{ ...style }}>
      <div
        styleName="img-wrapper"
        className="flex-column flex-lg-row py-3"
      >
        <RouterLink to={detailPath}>
          <img
            src={user.avatar || DefaultAvatar}
            alt={user.id}
            className="mb-sm-3 mb-0"
          />
        </RouterLink>
        <div styleName="user__info" className="d-flex flex-lg-row flex-column justify-content-between align-items-start">
          <div styleName="user__full-name">
            <RouterLink to={detailPath}>{user.user_full_name}</RouterLink>
            <div styleName="user__follow">
              <span>{user.follower_count}</span>
              Followers
            </div>
          </div>
          
          <Button color="danger" styleName="user__full-name--btn">
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(UserItem, style, { allowMultiple: true });
