import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "../styles/item.module.scss";
import DefaultAvatar from "constants/images/DefaultAvatar.png";
import StarIcon from "@material-ui/icons/Star";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch } from "react-redux";
import { Col, Row, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const [displayStart, toggleDisplayStart] = useState(false);
  const [displayEnd, toggleDisplayEnd] = useState(false);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item,
    });
  };
  const toggleTooltip = (type) => {
    if (type === 'start') {
      toggleDisplayStart(!displayStart);
    } else {
      toggleDisplayEnd(!displayEnd);
    }
  }
  const formatDate = (date) => {
    let elems = date.split("-");
    return elems.slice(0).reverse().join(".")
  }
  const detailPath = `/items/${item.id}`;
  const merchantPath = `/merchants/${item.merchant.user.username}`;
  const locationPath = `/items?fields=[country, city]+search_text=${item.rent_address.city} ${item.rent_address.country}`;

  return (
    <div styleName="item">
      <div styleName="img-wrapper">
        <img
          src={item.apartment.images[0] || DefaultAvatar}
          alt={item.description}
        />
      </div>
      <p styleName="item__price">
        <strong>${item.price}</strong>
      </p>

      <Link to={detailPath} styleName="item__title">
        {item.apartment.title}
      </Link>
      <Link to={locationPath} styleName="item__location">
        <LocationOnIcon styleName="icon__location" />
        {`${item.rent_address.city}, ${item.rent_address.country}`}
      </Link>

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
      <div styleName="item__info">
        <p>{item.description}</p>
        

        <div styleName="item__rating">
          {Array(item.rate)
            .fill()
            .map((index) => (
              <StarIcon key={index} styleName="icon__fa"></StarIcon>
            ))}
        </div>
      </div>
      <Link to={detailPath} styleName="item__details">
        Details
      </Link>
    </div>
  );
};

export default CSSModules(Item, style);
