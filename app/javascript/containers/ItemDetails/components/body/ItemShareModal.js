import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomForm from "../../../../components/Form";
import * as Yup from "yup";
import { CustomInput } from "../../../../components/Form/components";
import styled from "styled-components";
import {
  getBlobUrl,
  isValidImageSize,
  isValidImageType,
} from "../../../../utils";
import { createPost, sharePost } from "../../../../redux/post/post.action";
import ShareIcon from "@material-ui/icons/Share";
import { useDispatch } from "react-redux";
import ItemSearch from "../../../ItemSearchList/components/ItemSearch";
import ItemAttach from "../ItemAttach";

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
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 15px 15px 15px 0;
    border: 1px solid #dbdbdb;
    border-radius: 4px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ItemShareModal = ({ username, item }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
  };
  const handleFormSubmit = (data) => {
    data = { ...data, item_id: item.id };
    dispatch(sharePost(username, data));
    setOpen(false);
  };

  const fields = {
    initValues: {
      content: "",
    },
    validations: {
      content: Yup.string()
        .max(300, "Must be at most 300 characters")
        .required("Required"),
    },
  };

  return (
    <>
      <Button
        color="primary"
        outline
        className="d-flex align-items-center"
        onClick={toggleModal}
      >
        <ShareIcon className="me-2" />
        Share
      </Button>

      <CustomModal isOpen={open} toggle={toggleModal}>
        <ModalHeader>Share with friends</ModalHeader>
        <CustomModalBody>
          <CustomForm
            fields={fields}
            handleSubmit={handleFormSubmit}
            images={images}
          >
            <CustomInput
              name="content"
              id="content"
              type="textarea"
              placeholder="Share your opinion"
              rows="10"
            />
            <ItemAttach item={item} style="item__inModal" />

            <div className="mt-4 d-flex justify-content-end">
              <Button color="primary" type="submit">
                Share
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

export default ItemShareModal;
