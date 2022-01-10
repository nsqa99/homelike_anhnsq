import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import BlockIcon from "@material-ui/icons/Block";
import { destroyOrder } from "../../../../redux/order/order.action";

const DeleteModal = ({ username, orderId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleDestroy = () => {
    dispatch(destroyOrder(username, orderId));
    setOpen(false);
  };

  return (
    <>
      <Button color="danger" onClick={toggleModal}>
        <BlockIcon className="icon__delete" />
      </Button>
      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader>Cancel order</ModalHeader>
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
    </>
  );
};

export default DeleteModal;
