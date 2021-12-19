import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import {
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Nav,
  Navbar,
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  UncontrolledCollapse,
  Card,
  CardBody,
  Container,
} from "reactstrap";
import styles from "../styles/item-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import Item from "./Item";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const items = [
  {
    id: 1,
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
  },
];

const ItemSection = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Container fluid styleName="item__container">
      <Container>
        <FilterWrapper>
          <div styleName="item__list--title">Recent Listings</div>
          <FormGroup>
            <Input
              id="filter"
              name="filter"
              type="select"
              styleName="filter-select"
            >
              <option>Sorting</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
            </Input>
          </FormGroup>
        </FilterWrapper>
        <Row>
          {
            items.map((item) => {
              return (
                <Col key={item.id} xl="3" lg="4" md="6" sm="12">
                  <Item item={item} />
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </Container>
  );
};

export default CSSModules(ItemSection, styles, { allowMultiple: true });
