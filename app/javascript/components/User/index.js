import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import Avatar from "../../constants/images/Avatar.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShareIcon from "@material-ui/icons/Share";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch, useSelector } from "react-redux";
import { RouterLink } from "../custom/RouterLink";
import { formatDate, fullAddress } from "../../utils";
import { Button, Table } from "reactstrap";
import Follow from "../Follow";
import {
  followUser,
  getOneUser,
  unfollowUser,
} from "../../redux/user/user.action";

const User = ({ username, currentUser }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    dispatch(getOneUser(username));
  }, []);

  useEffect(() => {
    if (user) {
      let follower = user.follower_users?.find(
        (follower) => follower.username === currentUser
      );
      setIsFollowed(follower != null);
    }
  }, [user]);

  const handleFollowOrUnfollowAction = () => {
    if (!isFollowed) {
      dispatch(followUser(currentUser, username));
    } else {
      dispatch(unfollowUser(currentUser, username));
    }
  };

  return (
    <>
      {user && (
        <>
          <div styleName="user" style={{ ...style }}>
            <div
              styleName="img-wrapper"
              className="flex-column flex-lg-row py-3"
            >
              <img
                src={user.avatar || Avatar}
                alt={user.id}
                className="mb-sm-3 mb-0"
              />
              <div styleName="user__info">
                <div styleName="user__full-name">
                  {`${user.user_full_name}`}
                  <div
                    className="d-flex flex-wrap"
                    styleName="user__follow-block"
                  >
                    <Follow follower={true} user={user} currentUser={currentUser} />
                    <Follow user={user} currentUser={currentUser} />
                  </div>
                  {user.username !== currentUser && (
                    <Button
                      color="danger"
                      styleName="user__full-name--btn"
                      onClick={handleFollowOrUnfollowAction}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </div>
                <RouterLink to="" styleName="user__location">
                  <LocationOnIcon styleName="icon__location" />
                  {user.address && fullAddress(user.address)}
                </RouterLink>
                <div styleName="user__contact">
                  <Table borderless size="sm" styleName="">
                    <tbody>
                      <tr className="d-flex flex-wrap align-items-center">
                        <th scope="row">Phone:</th>
                        <td>{user.contact?.phone_number || "N/A"}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="d-flex flex-wrap align-items-center">
                        <th scope="row">Email:</th>
                        <td>{user.email || "N/A"}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CSSModules(User, style, { allowMultiple: true });
