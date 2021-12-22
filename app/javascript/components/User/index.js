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
import Follow from "../Follow";

const User = ({ user, rightPanel }) => {
  return (
    <div styleName="user" style={{ ...style }}>
      <div styleName="img-wrapper" className="flex-column flex-lg-row py-3">
        <img src={user.avatar || DefaultAvatar} alt={user.id} className="mb-sm-3 mb-0" />
        <div styleName="user__info">
          <div styleName="user__full-name">
            {`${user.user_full_name}`}
            <div className="d-flex flex-wrap" styleName="user__follow-block">
              <Follow follower={true} user={user} />
              <Follow user={user} />
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
