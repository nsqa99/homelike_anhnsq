import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomForm from "../../../components/Form";
import * as Yup from "yup";
import { CustomInput } from "../../../components/Form/components";
import styled from "styled-components";
import { getBlobUrl, isValidImageSize, isValidImageType } from "../../../utils";
import { createPost } from "../../../redux/post/post.action";
import { useDispatch } from "react-redux";


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

const PostCreateModal = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [imageError, setImageError] = useState({});
  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
    setImages([]);
    setImageError({});
  };
  const handleFormSubmit = (data) => {
    dispatch(createPost(username, data, postImages));
    setOpen(false);
  };
  const handleImageChange = (e) => {
    const imgArr = Array.from(e.target.files);
    setPostImages(imgArr);
    if (!isValidImageType(imgArr)) {
      setImageError({
        ...{
          invalid: true,
          message: "Image type must be jpg/jpeg/png",
        },
      });
    } else if (!isValidImageSize(imgArr)) {
      setImageError({
        ...{
          invalid: true,
          message: "Image size must be less than 2MB",
        },
      });
    } else {
      getBlobUrl(imgArr, setImages);
      setImageError({
        ...{
          invalid: false,
          message: "",
        },
      });
    }
  };
  const fields = {
    initValues: {
      content: "",
    },
    validations: {
      content: Yup.string()
        .max(1000, "Must be at most 1000 characters")
        .required("Required"),
    },
  };

  return (
    <>
      <Button
        color="danger"
        outline
        onClick={toggleModal}
        className="mb-5"
      >
        <AddIcon />
        Add new post
      </Button>

      <CustomModal isOpen={open} toggle={toggleModal}>
        <ModalHeader>Create new post</ModalHeader>
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
              placeholder="What are you thinking?"
              rows="10"
            />
            <CustomInput
              name="images"
              id="images"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              multiple
              onChange={(e) => handleImageChange(e)}
              imageValidator={imageError}
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
