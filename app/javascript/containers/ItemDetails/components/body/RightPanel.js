import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useSelector } from "react-redux";
import Item from "../../../Home/components/Item";
import styled from "styled-components";

const ItemWrapper = styled.div`
  margin-top: 30px;
`;

const RightPanel = () => {
  const items = [
    {
      id: 1,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
      price: 10000,
      rate: 3,
      initial_start_date: "2021-01-01",
      initial_end_date: "2021-12-01",
      apartment: {
        title: "Lorem ipsum",
        image_urls: [],
        rent_address: {
          city: "Hanoi",
          country: "Vietnam",
        },
        size: 70,
        initial_allowance: 2,
        max_allowance: 4,
        extra_fee_each_person: 30,
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
          facility_name: "Bedroom",
        },
        {
          id: 2,
          quality: 1,
          quantity: "Clean",
          facility_name: "Toilet",
        },
      ],
    },
    {
      id: 2,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
      price: 10000,
      rate: 3,
      initial_start_date: "2021-01-01",
      initial_end_date: "2021-12-01",
      apartment: {
        title: "Lorem ipsum",
        image_urls: [],
        rent_address: {
          city: "Hanoi",
          country: "Vietnam",
        },
        size: 70,
        initial_allowance: 2,
        max_allowance: 4,
        extra_fee_each_person: 30,
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
          facility_name: "Bedroom",
        },
        {
          id: 2,
          quality: 1,
          quantity: "Clean",
          facility_name: "Toilet",
        },
      ],
    },
    {
      id: 3,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis lobortis`,
      price: 10000,
      rate: 3,
      initial_start_date: "2021-01-01",
      initial_end_date: "2021-12-01",
      apartment: {
        title: "Lorem ipsum",
        image_urls: [],
        rent_address: {
          city: "Hanoi",
          country: "Vietnam",
        },
        size: 70,
        initial_allowance: 2,
        max_allowance: 4,
        extra_fee_each_person: 30,
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
          facility_name: "Bedroom",
        },
        {
          id: 2,
          quality: 1,
          quantity: "Clean",
          facility_name: "Toilet",
        },
      ],
    },
  ];

  return (
    <ItemWrapper>
      <div styleName="body__title" className="mb-5">
        Similar Apartments
      </div>
      {items.map((item) => (
        <Item key={item.id} item={item} style="item--no-margin" />
      ))}
    </ItemWrapper>
  );
};
export default CSSModules(RightPanel, style);
