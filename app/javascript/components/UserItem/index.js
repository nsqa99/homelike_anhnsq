import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import Avatar from "../../constants/images/Avatar.png";
import { useDispatch } from "react-redux";
import { RouterLink } from "../custom/RouterLink";
import { Button, Table } from "reactstrap";

const UserItem = ({ user, small, follower, following, currentUser }) => {
  console.log(user)
  const detailPath = `/social/users/${user.username}`;

  return (
    <div styleName="user" style={{ ...style }}>
      <div
        styleName={`img-wrapper${small ? "--small" : ""}`}
        className={`${!small && "flex-lg-row flex-column"} py-3`}
      >
        <RouterLink to={detailPath}>
          <img
            src={user.avatar || Avatar}
            alt={user.id}
            className="mb-sm-3 mb-0"
          />
        </RouterLink>
        <div
          styleName="user__info"
          className={`d-flex ${
            !small && "flex-lg-row flex-column"
          } justify-content-between align-items-start`}
        >
          <div styleName={`user__full-name${small ? "--small" : ""}`}>
            <RouterLink to={detailPath}>{user.user_full_name}</RouterLink>
            {(follower == null && following == null) && (
              <div styleName="user__follow">
                <span>{user.follower_count}</span>
                Followers
              </div>
            )}
          </div>

          {currentUser !== user.username && (
            <Button
              size={small ? "sm" : ""}
              color="danger"
              styleName={`user__full-name--btn${small ? "--small" : ""}`}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSSModules(UserItem, style, { allowMultiple: true });
