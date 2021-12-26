import React from "react";
import CurrencyFormat from "react-currency-format";
import { Button, Container, Input, Table } from "reactstrap";
import { formatDate, fullAddress } from "../../../../utils";
import CreateModal from "./ActionModal/CreateModal";
import DefaultAvatar from "../../../../constants/images/DefaultAvatar.png";
import styled from "styled-components";
import CustomPagination from "../../../../components/Pagination";

const ImageWrapper = styled.div`
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const Item = () => {
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
        image_urls: [DefaultAvatar],
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
        image_urls: [DefaultAvatar],
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
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Input style={{ width: "30%" }} />
        <CreateModal />
      </div>
      <Table responsive hover styleName="item__table">
        <tbody>
          <tr>
            <th>ID</th>
            <th></th>
            <th>Title</th>
            <th style={{ width: "25%" }}>Description</th>
            <th style={{ width: "15%" }}>Address</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Price</th>
            <th style={{ width: "25%" }}></th>
          </tr>
          {items.map((item) => {
            let apartment = item.apartment;

            return (
              <>
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <ImageWrapper>
                      <img
                        className="rounded"
                        src={item.apartment.image_urls[0]}
                      />
                    </ImageWrapper>
                  </td>
                  <td>{apartment.title}</td>
                  <td>{item.description}</td>
                  <td>{fullAddress(apartment.rent_address)}</td>
                  <td>{formatDate(item.initial_start_date)}</td>
                  <td>{formatDate(item.initial_end_date)}</td>
                  <td>
                    <CurrencyFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                  <td>
                    <div className="d-flex align-items-start justify-content-end">
                      <Button color="warning" className="me-2">
                        View
                      </Button>
                      <Button color="primary" className="me-2">
                        Edit
                      </Button>
                      <Button color="danger" className="me-2">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <CustomPagination
        url={`/host/items`}
        totalPages={4}
        currentPage={1}
      />
    </Container>
  );
};

export default Item;
