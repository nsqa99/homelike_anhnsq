import React, { useState } from "react";
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


const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .react-datepicker-wrapper,
  .form-control {
    width: 80%;
  }
  .react-datepicker-popper{
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
`

const ReserveModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
          Reserve {item.apartment.title}
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
            />
          </DatePickerWrapper>
        </ModalBody>
        <CustomFooter className="m-auto" style={{ width: "80%" }}>
          <div>
            <strong>
              Total:{"  "}
              <span className="fs-4">
                <CurrencyFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </strong>
          </div>
          <div>
            <strong>
              Extra Fee:{"  "}
              <span className="fs-4">
                <CurrencyFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </strong>
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
