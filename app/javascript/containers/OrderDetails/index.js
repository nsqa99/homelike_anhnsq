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
  // const order = {
  //   id: 1,
  //   customer: {
  //     name: "Anh Nguyen Sy Quang",
  //     email: "dev_customer@nsqa.com"
  //   },
  //   merchant: {
  //     name: "Anh Nguyen Sy Quang",
  //     email: "dev_merchant@nsqa.com"
  //   },
  //   item: {
  //     id: 1,
  //     description:
  //       `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
  //     price: 10000,
  //     rate: 3,
  //     initial_start_date: "2021-01-01",
  //     initial_end_date: "2021-12-01",
  //     apartment: {
  //       title: "Lorem ipsum",
  //       images: [
  //         DefaultAvatar
  //       ],
  //       rent_address: {
  //         city: "Hanoi",
  //         country: "Vietnam",
  //       },
  //       size: 70,
  //       initial_allowance: 2,
  //       max_allowance: 4,
  //       extra_fee_each_person: 30
  //     },
  //     merchant: {
  //       user: {
  //         username: "nsqa99",
  //         user_full_name: "Anh Nguyen Sy Quang",
  //       },
  //     },
  //     apartment_facilities: [
  //       {
  //         id: 1,
  //         quality: 2,
  //         quantity: "Nice",
  //         facility_name: "Bedroom"
  //       },
  //       {
  //         id: 2,
  //         quality: 1,
  //         quantity: "Clean",
  //         facility_name: "Toilet"
  //       }
  //     ]
  //   },
  //   created_at: "2021-12-21",
  // };

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
