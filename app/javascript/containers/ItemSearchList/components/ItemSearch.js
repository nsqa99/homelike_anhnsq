import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "../styles/item.module.scss";
import DefaultAvatar from "constants/images/DefaultAvatar.png";
import StarIcon from "@material-ui/icons/Star";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { Col, Row, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { formatDate, shortAddress } from "../../../utils";

const Item = ({ item, style }) => {
  const [displayStart, toggleDisplayStart] = useState(false);
  const [displayEnd, toggleDisplayEnd] = useState(false);

  const toggleTooltip = (type) => {
    if (type === "start") {
      toggleDisplayStart(!displayStart);
    } else {
      toggleDisplayEnd(!displayEnd);
    }
  };

  const detailPath = `/items/${item.id}`;
  const merchantPath = `/social/users/${item.merchant.user.username}`;

  return (
    <div styleName={style ? `item ${style}` : "item"}>
      <div styleName="img-wrapper">
        <img
          src={item.apartment.image_urls[0] || DefaultAvatar}
          alt={item.description}
        />
      </div>

      <div
        className="d-flex justify-content-between p-3"
        style={{ width: "60%" }}
      >
        <div className="d-flex flex-column justify-content-between">
          <Link to={detailPath} styleName="item__title">
            {item.apartment.title}
          </Link>
          <Link to="" styleName="item__location">
            <LocationOnIcon styleName="icon__location" />
            {shortAddress(item.apartment.rent_address)}
          </Link>

          <div>
            <strong>
              <CurrencyFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />{" "}
              / day
            </strong>
          </div>

          <Row styleName="item__time-info">
            <Tooltip
              autohide={true}
              target="start-date"
              isOpen={displayStart}
              toggle={() => toggleTooltip("start")}
            >
              Start date
            </Tooltip>
            <Col sm="6" id="start-date" className="d-flex align-items-center">
              <CalendarTodayIcon styleName="icon__calendar" />
              {formatDate(item.initial_start_date)}
            </Col>
            <Tooltip
              autohide={true}
              target="end-date"
              isOpen={displayEnd}
              toggle={() => toggleTooltip("end")}
            >
              End date
            </Tooltip>
            <Col sm="6" id="end-date" className="d-flex align-items-center">
              <CalendarTodayIcon styleName="icon__calendar" />
              {formatDate(item.initial_end_date)}
            </Col>
          </Row>

          <Link to={merchantPath} styleName="item__merchant">
            <PersonIcon styleName="icon__merchant" />
            {`${item.merchant.user.user_full_name}`}
          </Link>
        </div>

        <div styleName="item__rating">
          {Array(item.rate)
            .fill()
            .map((_, index) => (
              <StarIcon key={index} styleName="icon__fa"></StarIcon>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Item, style, { allowMultiple: true });
