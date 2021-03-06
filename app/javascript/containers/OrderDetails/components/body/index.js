import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useSelector } from "react-redux";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";
import { RouterLink } from "../../../../components/custom/RouterLink";
import ItemOrder from "../ItemOrder";
import { useHistory } from "react-router-dom";

const DetailBody = ({ order, location }) => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Row>
      <Col className="mt-4 d-flex flex-column align-items-center">
        <div styleName="body__title" className="mb-5 align-self-start">
          <div
            onClick={handleGoBack}
            className="d-flex align-items-center w-100 justify-content-start"
            styleName="post__create"
            style={{ cursor: "pointer" }}
          >
            <ArrowBackIosIcon styleName="icon__back" />
            Back
          </div>
        </div>
        <Card styleName="body__merchant">
          <CardBody>
            <ItemOrder order={order} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default CSSModules(DetailBody, style);
