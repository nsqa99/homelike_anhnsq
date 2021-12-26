import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import styled from "styled-components";
import {
  CustomDatePicker,
  CustomInput,
} from "../../../../../components/Form/components";
import CustomForm from "../../../../../components/Form";
import {
  getBlobUrl,
  isValidImageSize,
  isValidImageType,
} from "../../../../../utils";

const CustomModalBody = styled(ModalBody)`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 60vh;
`;
const CustomModal = styled(Modal)`
  max-width: 800px !important;

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

const CreateModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState({});
  const [dateRange, setDateRange] = useState([null, null]);

  const toggleModal = () => {
    setOpen(!open);
    setImages([]);
    setImageError({});
  };

  const handleImageChange = (e) => {
    const imgArr = Array.from(e.target.files);
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
      title: "",
      description: "",
      price: "",
      size: "",
      initial_allowance: "",
      max_allowance: "",
      extra_fee_each_person: "",
      startDate: "",
      endDate: "",
      homeNumber: "",
      district: "",
      city: "",
      country: "",
    },
    validations: {
      title: Yup.string()
        .max(30, "Must be at most 30 characters")
        .required("Required"),
      description: Yup.string()
        .max(500, "Must be at most 500 characters")
        .required("Required"),
      price: Yup.number().required("Required"),
      size: Yup.number().required("Required"),
      initial_allowance: Yup.number()
        .required("Required")
        .min(1, "Must be greater than 0"),
      max_allowance: Yup.number()
        .required("Required")
        .min(1, "Must be greater than 0"),
      extra_fee_each_person: Yup.number()
        .required("Required")
        .min(1, "Must be greater than 0"),
      startDate: Yup.date()
        .required("Required")
        .min(new Date(), "Must be greater than 0"),
      endDate: Yup.date().required("Required"),
      homeNumber: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    },
  };

  return (
    <>
      <Button color="danger" outline onClick={toggleModal} className="me-3">
        <AddIcon />
        Add new item
      </Button>

      <CustomModal isOpen={open} toggle={toggleModal}>
        <ModalHeader>Create new item</ModalHeader>
        <CustomModalBody>
          <CustomForm fields={fields} action={""} images={images}>
            <Row className="p-2">
              <Col xs="12" md="6">
                <CustomInput name="title" id="title" label="Title" />
                <CustomInput
                  name="description"
                  id="description"
                  label="Description"
                  type="textarea"
                  rows="5"
                />
                <CustomInput
                  name="price"
                  id="price"
                  label="Price"
                  type="number"
                />
                <CustomInput
                  name="size"
                  id="size"
                  label="Size"
                  type="number"
                  onChange={(e) => handleInputChange(e)}
                />
                <CustomInput
                  name="initial_allowance"
                  id="initial_allowance"
                  label="Customer initial allow"
                  type="number"
                />
                <CustomInput
                  name="max_allowance"
                  id="max_allowance"
                  label="Max customer allow"
                  type="number"
                />
                <CustomInput
                  name="extra_fee_each_person"
                  id="extra_fee_each_person"
                  label="Each person exceed fee"
                  type="number"
                />
              </Col>
              <Col xs="12" md="6">
                <CustomInput
                  name="startDate"
                  id="startDate"
                  label="Start Date"
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                />
                <CustomInput
                  name="endDate"
                  id="endDate"
                  label="End Date"
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                />
                <CustomInput
                  name="homeNumber"
                  id="homeNumber"
                  label="Home Number"
                />
                <CustomInput name="street" id="street" label="Street" />
                <CustomInput name="district" id="district" label="District" />
                <CustomInput name="city" id="city" label="City" />
                <CustomInput name="country" id="country" label="Country" />
                <CustomInput
                  name="images"
                  id="images"
                  type="file"
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
              </Col>
            </Row>

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

export default CreateModal;
