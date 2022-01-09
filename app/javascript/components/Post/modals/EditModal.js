import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomForm from "../../Form";
import * as Yup from "yup";
import { CustomInput } from "../../Form/components";
import { getBlobUrl, isValidImageSize, isValidImageType } from "../../../utils";
import { createPost, updatePost } from "../../../redux/post/post.action";
import { useDispatch } from "react-redux";
import { isEqual } from "lodash";
import EditIcon from "@material-ui/icons/Edit";
import CSSModules from "react-css-modules";
import styled from "styled-components";
import ItemAttach from "../../../containers/ItemDetails/components/ItemAttach";

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

const EditButton = styled.div`
  .icon__edit {
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: #1e45c5;
    }
    transition: color 0.15s ease-in-out;
  }
`;

const EditModal = ({ username, post }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [imageError, setImageError] = useState({});
  const dispatch = useDispatch();

  const toggleModal = () => {
    if (!open) {
      setImages(post.image_urls.map((img) => ({ key: img, url: img })));
    }
    setOpen(!open);
    setImageError({});
  };

  const handleFormSubmit = (data) => {
    dispatch(updatePost(username, post.id, data, postImages));
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
      content: post.content,
    },
    validations: {
      content: Yup.string()
        .max(1000, "Must be at most 1000 characters")
        .required("Required"),
    },
  };

  return (
    <>
      {!isEqual(post, {}) && (
        <>
          <EditButton onClick={toggleModal}>
            <EditIcon className="me-1 icon__edit" />
          </EditButton>

          <CustomModal isOpen={open} toggle={toggleModal}>
            <ModalHeader>Edit post</ModalHeader>
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
                {post.items.length === 0 ? (
                  <CustomInput
                    name="images"
                    id="images"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    onChange={(e) => handleImageChange(e)}
                    imageValidator={imageError}
                  />
                ) : (
                  <ItemAttach item={post.items[0]} style="item__inModal" />
                )}

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
      )}
    </>
  );
};

export default EditModal;
