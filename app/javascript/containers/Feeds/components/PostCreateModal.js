import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomForm from "../../../components/Form";
import * as Yup from "yup";
import { CustomTextInput } from "../../../components/Form/components";
import styled from "styled-components";

const PostCreateModal = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const fields = {
    initValues: {
      content: "",
    },
    validations: {
      content: Yup.string()
        .max(15, "Must be at most 300 characters")
        .required("Required"),
    },
  };
  const CustomModalBody = styled(ModalBody)`
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 60vh;
  `;
  const CustomModal = styled(Modal)`
    .modal-content {
      overflow: hidden;
      border-radius: 10px;
    }
  `;

  return (
    <>
      <Button
        color="danger"
        outline
        onClick={toggleModal}
        className="m-auto mb-5"
      >
        <AddIcon />
        Add new post
      </Button>

      <CustomModal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create new post</ModalHeader>
        <CustomModalBody>
          <CustomForm fields={fields}>
            <CustomTextInput
              name="content"
              id="content"
              type="textarea"
              placeholder="What are you thinking?"
              rows="10"
            />
            <div className="mt-4 d-flex justify-content-end">
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button onClick={toggleModal} className="ms-2">Cancel</Button>
            </div>
          </CustomForm>
        </CustomModalBody>
        {/* <ModalFooter>
          
        </ModalFooter> */}
      </CustomModal>
    </>
  );
};

export default PostCreateModal;
