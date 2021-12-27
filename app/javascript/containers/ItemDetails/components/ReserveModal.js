import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../styles/modal.module.scss";
import { useSelector } from "react-redux";
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
import { calculateDateDiff } from "../../../utils";

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

const ReserveModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [numOfCustomers, setNumOfCustomers] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [extraFee, setExtraFee] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      let dateDiff = calculateDateDiff(startDate, endDate);
      setTotalPrice(dateDiff * item.price);
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

  useEffect(() => {
    setTotalPaid(extraFee + totalPrice);
  }, [extraFee, totalPrice]);

  return (
    <>
      <Button
        color="danger"
        styleName="modal__btn--reserve"
        onClick={toggleModal}
        className="w-100"
      >
        Reserve
      </Button>
      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Reserve <strong>{item.apartment.title}</strong>
        </ModalHeader>
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
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
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
          <Button
            color="primary"
            className="w-100 mt-5"
            size="lg"
            onClick={function noRefCheck() {}}
          >
            Proceed
          </Button>
        </CustomFooter>
      </Modal>
    </>
  );
};

export default CSSModules(ReserveModal, style);
