import React from "react";
import CSSModules from "react-css-modules";
import { Button, Col, Container, Row } from "reactstrap";
import style from "../styles/item-order.module.scss";
import CurrencyFormat from "react-currency-format";
import { RouterLink } from "../../../components/custom/RouterLink";
import { formatDate } from "../../../utils";

const ItemOrder = ({ order }) => {
  return (
    <Container className="p-2">
      <div className="d-flex mb-md-5 flex-column flex-md-row justify-content-start align-items-center align-items-md-stretch">
        <img
          styleName="item__image"
          className="rounded mb-md-0 mb-4"
          src={order.item.apartment.image_urls[0]}
        />
        <div className="d-flex flex-column align-items-md-start justify-content-center justify-content-md-between ms-5">
          <RouterLink to={`/items/${order.item.id}`} styleName="item__title">
            <div className="fs-3 fw-bold">{order.item.apartment.title}</div>
          </RouterLink>
          <div className="text-md-end">{order.item.description}</div>
          <div className="fw-bold text-danger fs-5 mt-4 mt-md-0">
            <CurrencyFormat
              value={order.item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            {"  "}/{"  "}night
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-md-5">
        <h3>Your options</h3>
        <Row className="mt-4">
          <Col sm="6" className="d-flex flex-column align-items-start justify-content-end">
            <div className="mb-2">
              <span className="fw-bold me-3">Checkin date:</span>
              {formatDate(order.start_rent_date)}
            </div>
            <div className="mb-2">
              <span className="fw-bold me-3">Checkout date:</span>
              {formatDate(order.end_rent_date)}
            </div>
            <div>
              <span className="fw-bold me-3">Number of people:</span>
              {order.customer_quantity}
            </div>
          </Col>
          <Col
            sm="6"
            className="d-flex flex-column justify-content-center align-items-md-end mt-3 mt-md-0"
          >
            <div>
              <span className="fw-bold">Total:</span>
              <span className=" ms-2 fs-4">
                <CurrencyFormat
                  value={order.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
            <div>
              <span className="fw-bold">+ Extra Fee:</span>
              <span className=" ms-2 fs-4">
                <CurrencyFormat
                  value={order.extra_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
            <div>
              <span className="fw-bold">Total paid amount:</span>
              <span className=" ms-2 fs-4">
                <CurrencyFormat
                  value={order.total_paid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
          </Col>
          <Button
            color="danger"
            className="w-100 mt-5"
            size="lg"
            onClick={function noRefCheck() {}}
          >
            Confirm payment
          </Button>
        </Row>
      </div>
    </Container>
  );
};

export default CSSModules(ItemOrder, style);
