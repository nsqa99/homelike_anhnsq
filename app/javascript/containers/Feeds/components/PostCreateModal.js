import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomForm from "../../../components/Form";
import * as Yup from "yup";
import { CustomInput } from "../../../components/Form/components";
import styled from "styled-components";
import { getBlobURl } from "../../../utils";

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

const CustomImagePreview = styled.div`
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const PostCreateModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const toggleModal = () => {
    setOpen(!open);
    setImages([]);
  };
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
        <ModalHeader>Create new post</ModalHeader>
        <CustomModalBody>
          <CustomForm fields={fields}>
            <CustomInput
              name="content"
              id="content"
              type="textarea"
              placeholder="What are you thinking?"
              rows="10"
            />
            <CustomInput
              name="images"
              id="images"
              type="file"
              multiple
              onChange={(e) =>
                getBlobURl(Array.from(e.target.files), setImages)
              }
            />
            {images.length > 0 && (
              <CustomImagePreview>
                {images.map(({ key, url }) => (
                  <img key={key} src={url} />
                ))}
              </CustomImagePreview>
            )}

            <div className="mt-4 d-flex justify-content-end">
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button onClick={toggleModal} className="ms-2">
                Cancel
              </Button>
            </div>
          </CustomForm>
        </CustomModalBody>
      </CustomModal>
    </>
  );
};

export default PostCreateModal;
