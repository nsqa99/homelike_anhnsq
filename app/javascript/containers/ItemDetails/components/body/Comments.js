import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss"
import { useSelector } from "react-redux";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Input } from "reactstrap";
import DefaultAvatar from "../../../../constants/images/DefaultAvatar.png";

const Comments = ({ comment }) => {

  return (
    <Card styleName="body__comment">
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <img src={DefaultAvatar} styleName="body__comment--avatar" />
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

        <div styleName="body__comment--content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam venenatis lobortis Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam venenatis lobortis
        </div>
      </CardBody>
    </Card>
  );
};
export default CSSModules(Comments, style);
