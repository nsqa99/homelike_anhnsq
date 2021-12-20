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
import { Button, Table } from 'reactstrap';

const User = ({ user, rightPanel }) => {
  const dispatch = useDispatch();
  const [displayLong, toggleDisplayLong] = useState(false);
  const handleReadMore = () => {
    toggleDisplayLong(!displayLong);
  };

  // const detailPath = `/social/users/${user.id}`;
  // const ownerPath = `/social/profile/${user.username}`;

  return (
    <div styleName="user" style={{ ...style }}>
      <div styleName="img-wrapper" className="flex-column flex-lg-row py-sm-4 py-0">
        <img src={user.avatar || DefaultAvatar} alt={user.id} className="mb-sm-3 mb-0" />
        <div styleName="user__info">
          <div styleName="user__full-name">
            {`${user.user_full_name}`}
            <div className="d-flex flex-wrap" styleName="user__follow-block">
              <div styleName="user__follow">
                <span>{user.follower_count}</span>
                Followers
              </div>
              <div styleName="user__follow" className="me-2">
                <span>{user.following_count}</span>
                Following
              </div>
            </div>
            <Button color="danger" styleName="user__full-name--btn">Follow</Button>
          </div>
          <RouterLink to="" styleName="user__location">
            <LocationOnIcon styleName="icon__location" />
            {user.address}
          </RouterLink>
          <div styleName="user__contact">
            <Table borderless size="sm" styleName="">
              <tbody>
                <tr className="d-flex flex-wrap align-items-center">
                  <th scope="row">Phone</th>
                  <td>0123456789</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="d-flex flex-wrap align-items-center">
                  <th scope="row">Email</th>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(User, style, { allowMultiple: true });
