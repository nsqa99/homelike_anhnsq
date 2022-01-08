import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import Avatar from "../../constants/images/Avatar.png";
import { useDispatch } from "react-redux";
import { RouterLink } from "../custom/RouterLink";
import { Button, Table } from "reactstrap";
import { followUser, unfollowUser } from "../../redux/user/user.action";

const UserItem = ({ user, small, follower, following, currentUser, outsider }) => {
  const detailPath = `/social/users/${user.username}`;
  const listFollowers = user.list_follower;
  const dispatch = useDispatch();

  const handleFollow = () => {
    !follower && !following
      ? dispatch(followUser(currentUser, user.username, true))
      : dispatch(followUser(currentUser, user.username));
  };

  const handleUnfollow = () => {
    !follower && !following
      ? dispatch(unfollowUser(currentUser, user.username, true))
      : dispatch(unfollowUser(currentUser, user.username));
  };

  return (
    <>
      {user && (
        <div styleName="user" style={{ ...style }}>
          <div
            styleName={`img-wrapper${small ? "--small" : ""}`}
            className={`${!small && "flex-lg-row flex-column"} py-3`}
          >
            <RouterLink to={detailPath}>
              <img src={user.avatar_url || Avatar} alt={user.id} />
            </RouterLink>
            <div
              styleName="user__info"
              className={`d-flex ${
                !small && "flex-lg-row flex-column"
              } justify-content-between align-items-center`}
            >
              <div styleName={`user__full-name${small ? "--small" : ""}`}>
                <RouterLink to={detailPath}>{user.user_full_name}</RouterLink>
                <div
                  styleName={`user__username${small ? "--small" : ""}`}
                  className="fw-bold"
                >
                  {user.username}
                </div>
                {follower == null && following == null && (
                  <div styleName="user__follow">
                    <span>{user.follower_count}</span>
                    Followers
                  </div>
                )}
              </div>

              {(currentUser !== user.username && !outsider) && (
                <>
                  {listFollowers.find(
                    (user) => user.username === currentUser
                  ) ? (
                    <Button
                      size={small ? "sm" : ""}
                      color="danger"
                      onClick={handleUnfollow}
                      styleName={`user__full-name--btn${
                        small ? "--small" : ""
                      }`}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      size={small ? "sm" : ""}
                      color="danger"
                      onClick={handleFollow}
                      styleName={`user__full-name--btn${
                        small ? "--small" : ""
                      }`}
                    >
                      Follow
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CSSModules(UserItem, style, { allowMultiple: true });
