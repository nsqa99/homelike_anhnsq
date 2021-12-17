import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../styles/modal.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const ReserveModal = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
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
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            Do Something
          </Button>{" "}
          <Button onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CSSModules(ReserveModal, style);
