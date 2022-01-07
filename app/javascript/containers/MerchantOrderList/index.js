import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Badge, Button, Container, Input, Table } from "reactstrap";
import { formatDate, fullAddress } from "../../utils";
import DefaultAvatar from "../../constants/images/DefaultAvatar.png";
import styled from "styled-components";
import CustomPagination from "../../components/Pagination";
import { isEmpty } from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils";
import { getAllOrderMerchant, makePayout } from "../../redux/order/order.action";
import { RouterLink } from "../../components/custom/RouterLink";
import PaymentIcon from '@material-ui/icons/Payment';
import NotificationToast from "../../components/Toast";

const ImageWrapper = styled.div`
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const MerchantOrderList = () => {
  const authData = useSelector((state) => state.auth.data);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePayout = (id) => {
    dispatch(makePayout(authData.username, id))
  };

  // const handleUpdateModal = (id) => {
  //   setSelectedorder(id);
  //   setUpdateModalOpen(true);
  // };

  const handleViewModal = (id) => {
    history.push(`/users/${authData.username}/orders/${id}`)
  };

  useEffect(() => {
    if (authData) {
      dispatch(getAllOrderMerchant(authData.username));
    }
  }, []);

  return (
    <Container className="mt-5">
      <NotificationToast />
      {!isEmpty(orders.list) ? (
        <>
          <Table responsive hover styleName="order__table">
            <tbody>
              <tr>
                <th>ID</th>
                <th></th>
                <th style={{ width: "15%" }}>Rent Address</th>
                <th>Checkin Date</th>
                <th>Checkout Date</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Payout Status</th>
                <th></th>
              </tr>
              {orders.list.map((order) => {
                let item = order.item;
                let apartment = item.apartment;
                let itemDetailPath = `/items/${item.id}`

                return (
                  <>
                    <tr>
                      <td>{order.id}</td>
                      <td>
                        <RouterLink to={itemDetailPath}>
                          <ImageWrapper>
                            <img
                              className="rounded"
                              src={apartment.image_urls[0] || DefaultAvatar}
                            />
                          </ImageWrapper>
                        </RouterLink>
                      </td>
                      <td>{fullAddress(apartment.rent_address)}</td>
                      <td>{formatDate(order.start_rent_date)}</td>
                      <td>{formatDate(order.end_rent_date)}</td>
                      <td>{order.customer_info}</td>
                      <td>
                        <CurrencyFormat
                          value={order.total_paid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>
                        <Badge
                          color={
                            order.payout_status === "paid" ? "success" : "primary"
                          }
                          pill
                        >
                          {order.payout_status === "paid" ? "Paid" : "Waiting request"}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-orders-start justify-content-end">
                          {/* <Button
                            color="warning"
                            className="me-2"
                            onClick={() => handleViewModal(order.id)}
                          >
                            Details
                          </Button> */}
                          {order.payout_status !== "paid" && (
                            <Button
                              color="danger"
                              className="me-2"
                              onClick={(e) => handlePayout(order.id)}
                            >
                              Get Payout
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <CustomPagination
            totalPages={orders.pagination.total_pages}
            currentPage={orders.pagination.page}
            fn={(options) => dispatch(getAllOrder(authData.username, options))}
          />
        </>
      ) : (
        <span className="fs-5 fw-bold">No orders found</span>
      )}
    </Container>
  );
};

export default MerchantOrderList;
