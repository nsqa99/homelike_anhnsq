import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { destroyPost } from "../../../redux/post/post.action";
import styled from "styled-components";

const DeleteButton = styled.div`
  .icon__delete {
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: #ff0000;
    }
    transition: color 0.15s ease-in-out;
  }
`;

const DeleteModal = ({ username, postId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleDestroy = () => {
    dispatch(destroyPost(username, postId));
    setOpen(false);
  };

  return (
    <>
      <DeleteButton onClick={toggleModal}>
        <DeleteIcon className="icon__delete" />
      </DeleteButton>
      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader>Delete post</ModalHeader>
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
      </Modal>{" "}
    </>
  );
};

export default DeleteModal;
