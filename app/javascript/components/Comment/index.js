import React from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss"
import { useSelector } from "react-redux";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Input } from "reactstrap";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";

const Comment = ({ comment }) => {

  return (
    <Card styleName="comment">
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <img src={DefaultAvatar} styleName="comment__avatar" />
          <CardTitle className="ms-2 mb-0" styleName="">
            {"Anh Nguyen Sy Quang"}
          </CardTitle>
        </div>
        <CardSubtitle
          className="mb-2 ms-1 text-muted"
        >
          Tue, 12/01/2021, 05:00:00
        </CardSubtitle>

        <hr />

        <div styleName="comment__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam venenatis lobortis
        </div>
      </CardBody>
    </Card>
  );
};
export default CSSModules(Comment, style);
