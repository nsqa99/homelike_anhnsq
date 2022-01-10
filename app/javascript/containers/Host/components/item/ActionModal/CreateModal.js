import React, { useRef, useState } from "react";
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
  getLatLngApi,
  isValidImageSize,
  isValidImageType,
} from "../../../../../utils";
import { useDispatch } from "react-redux";
import { createItem } from "../../../../../redux/item/item.action";
import MapComponent from "../Map";
import { add, debounce, isEqual, throttle } from "lodash";
import { HANOI_LAT_LON } from "../../../../../common/constant";
import toast, { Toaster } from "react-hot-toast";
import { FillerWrapper } from "../../../../../components/LoadingFiller";

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

const CreateModal = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [validAddress, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [latLon, setLatLon] = useState(HANOI_LAT_LON);
  const [itemImages, setItemImages] = useState([]);
  const [imageError, setImageError] = useState({});
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleFormSubmit = async (data) => {
    const [latitude, longitude] = latLon;
    if (latitude && longitude) {
      data = {
        ...data,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    }
    console.log(data);
    dispatch(createItem(username, data, itemImages));
    setOpen(false);
  };

  const handleVerifyAddress = async () => {
    const data = formRef.current.values;
    console.log(data);
    if (data.street && data.district && data.city && data.country) {
      const address = [
        data.street,
        data.district,
        data.city,
        data.country,
      ].join(",");
      const toastId = toast.loading("Verifying...");
      setLoading(true);
      const response = await getLatLngApi(address);
      if (response) {
        toast.success("All done! Check it on map", { id: toastId });
        setLatLon([response.lat, response.lon]);
        setValid(true);
        setLoading(false);
      } else {
        toast.error("Address cannot be resolved :(", { id: toastId });
        setLatLon(HANOI_LAT_LON);
        setValid(false);
        setLoading(false);
      }
    }
  };

  const handleAddressChange = (e) => {
    formRef.current.handleBlur(e);
    handleVerifyAddress();
  };

  const toggleModal = () => {
    setOpen(!open);
    setImages([]);
    setImageError({});
    setLatLon(HANOI_LAT_LON);
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
      price: Yup.number().required("Required").min(1, "Must be greater than 0"),
      size: Yup.number().required("Required").min(1, "Must be greater than 0"),
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
        .required("Required"),
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
        Add apartment
      </Button>

      <CustomModal isOpen={open} toggle={toggleModal}>
        {loading && <FillerWrapper />}
        <ModalHeader>Create apartment</ModalHeader>
        <CustomModalBody>
          <CustomForm
            fields={fields}
            handleSubmit={handleFormSubmit}
            images={images}
            formRef={formRef}
          >
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
                <CustomInput name="size" id="size" label="Size" type="number" />
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
                <CustomInput
                  name="street"
                  id="street"
                  label="Street"
                  onBlur={(e) => handleAddressChange(e)}
                />
                <CustomInput
                  name="district"
                  id="district"
                  label="District"
                  onBlur={(e) => handleAddressChange(e)}
                />
                <CustomInput
                  name="city"
                  id="city"
                  label="City"
                  onBlur={(e) => handleAddressChange(e)}
                />
                <CustomInput
                  name="country"
                  id="country"
                  label="Country"
                  onBlur={(e) => handleAddressChange(e)}
                />
                <MapComponent latLon={latLon} setLatLon={setLatLon} />
              </Col>
            </Row>

            <div className="mt-4 d-flex justify-content-end">
              <Button color="primary" type="submit" disabled={!validAddress}>
                Save
              </Button>
              <Toaster />
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
