import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../styles/header.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Button, Col, Row } from "reactstrap";


const DetailHeader = ({ id, price, title, address }) => {
  return (
    <Row className="mt-3 p-3">
      <Col sm="12" md="6">
        <div styleName="item__title">
          {title}
        </div>
        <Link to="" styleName="item__location">
          <LocationOnIcon styleName="icon__location" />
          {address}
        </Link>
      </Col>
      <Col sm="12" md="6" className="d-flex flex-column align-items-end">
        <div styleName="item__price">
          <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </div>
        <div styleName="item__id">
          <strong>ID:</strong> {id}
        </div>
      </Col>
      <hr className="mt-3" />
    </Row>
    
  );
};
export default CSSModules(DetailHeader, style);
