import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CartModal = ({ openModal, onClose, ...props }) => {
  return (
    <Modal isOpen={openModal} toggleModal={onClose} {...props}>
      <ModalHeader>Giỏ hàng</ModalHeader>
      <ModalBody>
        <ul>
          <li>Sản phẩm 1: 100 cái</li>
          <li>Sản phẩm 2: 200 cái</li>
          <li>Sản phẩm 3: 300 cái</li>
          <li>Sản phẩm 4: 400 cái</li>
        </ul>
        <div>Tổng thiệt hại: 500k</div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClose}>
          Thanh toán
        </Button>{" "}
        <Button color="danger" onClick={onClose}>
          Hủy mua
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CartModal;
