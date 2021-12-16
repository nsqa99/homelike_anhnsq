import React from "react";
import CSSModules from "react-css-modules";
import DEFAULT_AVATAR from "./avatar.png";
import styles from "./style.module.scss";

const Avatar = () => {
  return (
    <div styleName="wrapper">
      <img src={DEFAULT_AVATAR} alt="avatar" />
    </div>
  );
};

export default CSSModules(Avatar, styles);
