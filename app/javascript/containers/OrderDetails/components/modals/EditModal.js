import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import BlockIcon from "@material-ui/icons/Block";
import EditIcon from "@material-ui/icons/Edit";
import { calculateDateDiff, convertToUTC } from "../../../../utils";
import { updateOrder } from "../../../../redux/order/order.action";

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .react-datepicker-wrapper,
  .form-control {
    width: 80%;
  }
  .react-datepicker-popper {
    z-index: 10000;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    text-align: start;
    margin: 10px 0;
  }
`;

const CustomFooter = styled(ModalFooter)`
  flex-direction: column;
  align-items: flex-end;
`;

const EditModal = ({ currentUser, item, order }) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    new Date(order.start_rent_date),
    new Date(order.end_rent_date),
  ]);
  const [startDate, endDate] = dateRange;
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [numOfCustomers, setNumOfCustomers] = useState(order.customer_quantity);
  const [totalPrice, setTotalPrice] = useState(order.total);
  const [extraFee, setExtraFee] = useState(order.extra_price);
  const [totalPaid, setTotalPaid] = useState(order.total_paid);
  const [daySpend, setDaySpend] = useState(
    calculateDateDiff(
      new Date(order.start_rent_date),
      new Date(order.end_rent_date)
    )
  );
  const [isRedirect, setRedirect] = useState(false);
  const [isOrderItemRedirect, setOrderItemRedirect] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // const order = useSelector((state) => state.orders.order);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      let dateDiff = calculateDateDiff(startDate, endDate);
      setDaySpend(dateDiff);
      setTotalPrice(dateDiff * item.price);
      setStart(convertToUTC(startDate));
      setEnd(convertToUTC(endDate));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (numOfCustomers > item.apartment.initial_allowance) {
      setExtraFee(
        (numOfCustomers - item.apartment.initial_allowance) *
          item.apartment.extra_fee_each_person
      );
    } else {
      setExtraFee(0);
    }
  }, [numOfCustomers]);

  // useEffect(() => {
  //   if (orderItem && !isEqual(orderItem, {}) && !isEqual(item, {})) {
  //     setOrderItemRedirect(orderItem.item.id === item.id);
  //   }
  // }, [orderItem]);

  useEffect(() => {
    setTotalPaid(extraFee + totalPrice);
  }, [extraFee, totalPrice]);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleOrderSubmit = () => {
    const orderDatas = {
      start_rent_date: start,
      end_rent_date: end,
      customer_quantity: numOfCustomers,
      total: totalPrice,
      extra_price: extraFee,
      total_paid: totalPaid,
    };

    dispatch(updateOrder(currentUser, order.id, orderDatas));
    setOpen(false);
  };

  return (
    <>
      <Button color="primary" className="me-2" onClick={toggleModal}>
        <EditIcon />
      </Button>

      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Update order</ModalHeader>
        <ModalBody>
          <div
            className="text-danger m-auto mb-4 fs-5"
            style={{ width: "80%" }}
          >
            <strong>
              <CurrencyFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />{" "}
              / night
            </strong>
          </div>
          <DatePickerWrapper>
            <DatePicker
              selectsRange={true}
              minDate={new Date(order.item.initial_start_date)}
              maxDate={new Date(order.item.initial_end_date)}
              startDate={startDate}
              endDate={endDate}
              excludeDates={item.disabled_dates
                .map((date) => new Date(date))
                .filter(
                  (d) =>
                    (d.getTime() < new Date(order.start_rent_date).getTime() ||
                    d.getTime() > new Date(order.end_rent_date).getTime())
                )}
              placeholderText="Start date - End date"
              onChange={(update) => {
                setDateRange(update);
              }}
            />

            <Input
              id="numOfCustomers"
              name="numOfCustomers"
              placeholder="Number of Customers"
              type="number"
              min={1}
              max={item.apartment.max_allowance}
              value={numOfCustomers}
              onChange={(e) => setNumOfCustomers(e.target.value)}
            />
          </DatePickerWrapper>
        </ModalBody>
        <CustomFooter className="m-auto" style={{ width: "80%" }}>
          <div>
            <span className="fw-bold">Total:</span>
            {daySpend > 0 && (
              <span className="text-muted"> ( x {daySpend} days ) </span>
            )}
            <span className=" ms-2 fs-4">
              <CurrencyFormat
                value={totalPrice}
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
                value={extraFee}
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
                value={totalPaid}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </span>
          </div>
          <div className="mt-5 d-flex">
            <Button color="primary" onClick={handleOrderSubmit}>
              Save
            </Button>
            <Button onClick={toggleModal} className="ms-2">
              Cancel
            </Button>
          </div>
        </CustomFooter>
      </Modal>
    </>
  );
};

export default CSSModules(EditModal, style);
