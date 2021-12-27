import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import { destroyItem } from "../../../../../redux/item/item.action";

const DeleteModal = ({ username, itemId, isOpen, setOpen, isSearch }) => {
  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleDestroy = () => {
    dispatch(destroyItem(username, itemId, isSearch));
    setOpen(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader>Delete apartment</ModalHeader>
      <ModalBody>Are you sure?</ModalBody>
      <ModalFooter>
        <div className="mt-4 d-flex justify-content-end">
          <Button color="primary" type="submit" onClick={handleDestroy}>
            Yes
          </Button>
          <Button onClick={toggleModal} className="ms-2">
            No
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
