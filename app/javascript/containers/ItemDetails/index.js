import React from "react";
import { Container } from "reactstrap";
import DetailHeader from "./components/DetailHeader.js";
import DetailBody from "./components/body";
import { shortAddress } from "../../utils/index.js";

const ItemDetails = ({ match: { params } }) => {
  const itemId = params?.id;
  const item = {
    id: itemId,
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
    price: 10000,
    rate: 3,
    initial_start_date: "2021-01-01",
    initial_end_date: "2021-12-01",
    apartment: {
      title: "Lorem ipsum",
      images: [],
      rent_address: {
        city: "Hanoi",
        country: "Vietnam",
      },
      size: 70,
      initial_allowance: 2,
      max_allowance: 4,
      extra_fee_each_person: 30
    },
    merchant: {
      user: {
        username: "nsqa99",
        user_full_name: "Anh Nguyen Sy Quang",
      },
    },
    apartment_facilities: [
      {
        id: 1,
        quality: 2,
        quantity: "Nice",
        facility_name: "Bedroom"
      },
      {
        id: 2,
        quality: 1,
        quantity: "Clean",
        facility_name: "Toilet"
      }
    ]
  };
  return (
    <Container>
      <DetailHeader
        id={itemId}
        price={item.price}
        title={item.apartment.title}
        address={shortAddress(item.apartment.rent_address)}
      />
      <DetailBody item={item} />
    </Container>
  );
};
export default ItemDetails;
