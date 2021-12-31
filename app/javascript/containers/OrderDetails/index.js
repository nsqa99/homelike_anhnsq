import React, { useEffect } from "react";
import { Container } from "reactstrap";
import DetailBody from "./components/body";
import { goBack, shortAddress } from "../../utils/index.js";
import { useHistory } from "react-router-dom";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOneOrder } from "../../redux/order/order.action";
import { isEqual } from "lodash";

const OrderDetails = ({ match: { params }, location }) => {
  const orderId = params?.id;
  const username = params?.username;

  const order = useSelector((state) => state.orders.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneOrder(username, orderId));
  }, []);

  return (
    <Container>
      {!isEqual(order, {}) && <DetailBody order={order} location={location} />}
    </Container>
  );
};
export default OrderDetails;
