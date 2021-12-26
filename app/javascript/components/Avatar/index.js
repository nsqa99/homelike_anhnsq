import React from "react";
import CSSModules from "react-css-modules";
import DefaultAvatar from "../../constants/images/Avatar.png";
import styles from "./style.module.scss";

const Avatar = ({ src }) => {
  return (
    <div styleName="wrapper">
      <img src={src || DefaultAvatar} alt="avatar" />
    </div>
  );
};

export default CSSModules(Avatar, styles);
