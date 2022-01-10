import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Col,
  Input,
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
import { useDispatch } from "react-redux";
import { createItem, updateItem } from "../../../../../redux/item/item.action";
import { includes, isEmpty, isEqual } from "lodash";

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

const ViewModal = ({ username, items, itemId, isOpen, setOpen, isSearch }) => {
  const [images, setImages] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const [imageError, setImageError] = useState({});
  const [item, setItem] = useState({});
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    console.log(itemImages);
    dispatch(updateItem(username, itemId, data, itemImages, isSearch));
    setOpen(false);
  };

  useEffect(() => {
    if (!isEmpty(items)) {
      setItem(items.data.find((item) => item.id === itemId) || {});
    }
  }, [itemId, items]);

  useEffect(() => {
    if (!isEqual(item, {})) {
      setImages(
        item.apartment.image_urls.map((url) => ({
          key: url,
          url,
        }))
      );
    }
  }, [item]);

  const toggleModal = () => {
    setOpen(!isOpen);
    setImages([
      { key: item.apartment.image_urls, url: item.apartment.image_urls },
    ]);
    setImageError({});
  };

  const handleImageChange = (e) => {
    const imgArr = Array.from(e.target.files);
    setItemImages(imgArr);
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
      title: item.apartment?.title,
      description: item.description,
      price: item.price,
      size: item.apartment?.size,
      initial_allowance: item.apartment?.initial_allowance,
      max_allowance: item.apartment?.max_allowance,
      extra_fee_each_person: item.apartment?.extra_fee_each_person,
      startDate: item.initial_start_date?.split("T")[0],
      endDate: item.initial_end_date?.split("T")[0],
      homeNumber: item.apartment?.rent_address.home_number,
      district: item.apartment?.rent_address.district,
      city: item.apartment?.rent_address.city,
      country: item.apartment?.rent_address.country,
    },
  };

  return (
    <>
      <CustomModal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader>View apartment</ModalHeader>
        <CustomModalBody>
          <CustomForm
            fields={fields}
            handleSubmit={handleFormSubmit}
            images={images}
          >
            <Row className="p-2">
              <Col xs="12" md="6">
                <CustomInput disabled name="title" id="title" label="Title" />
                <CustomInput
                  disabled
                  name="description"
                  id="description"
                  label="Description"
                  type="textarea"
                  rows="5"
                  defaultValue="5"
                />
                <CustomInput
                  disabled
                  name="price"
                  id="price"
                  label="Price"
                  type="number"
                />
                <CustomInput
                  disabled
                  name="size"
                  id="size"
                  label="Size"
                  type="number"
                />
                <CustomInput
                  disabled
                  name="initial_allowance"
                  id="initial_allowance"
                  label="Customer initial allow"
                  type="number"
                />
                <CustomInput
                  disabled
                  name="max_allowance"
                  id="max_allowance"
                  label="Max customer allow"
                  type="number"
                />
                <CustomInput
                  disabled
                  name="extra_fee_each_person"
                  id="extra_fee_each_person"
                  label="Each person exceed fee"
                  type="number"
                />
              </Col>
              <Col xs="12" md="6">
                <CustomInput
                  disabled
                  name="startDate"
                  id="startDate"
                  label="Start Date"
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                />
                <CustomInput
                  disabled
                  name="endDate"
                  id="endDate"
                  label="End Date"
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                />
                <CustomInput
                  disabled
                  name="homeNumber"
                  id="homeNumber"
                  label="Home Number"
                />
                <CustomInput
                  disabled
                  name="street"
                  id="street"
                  label="Street"
                />
                <CustomInput
                  disabled
                  name="district"
                  id="district"
                  label="District"
                />
                <CustomInput disabled name="city" id="city" label="City" />
                <CustomInput
                  disabled
                  name="country"
                  id="country"
                  label="Country"
                />
                <CustomImagePreview>
                  {images.map(({ key, url }) => (
                    <img key={key} src={url} />
                  ))}
                </CustomImagePreview>
              </Col>
            </Row>

            {/* <div className="mt-4 d-flex justify-content-end">
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button onClick={toggleModal} className="ms-2">
                Cancel
              </Button>
            </div> */}
          </CustomForm>
        </CustomModalBody>
      </CustomModal>
    </>
  );
};

export default ViewModal;
