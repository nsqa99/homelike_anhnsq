import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Col,
  Input,
  Label,
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
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../../../../redux/item/item.action";
import { includes, isEmpty, isEqual } from "lodash";
import MapComponent from "../Map";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HANOI_LAT_LON } from "../../../../../common/constant";
import CreatableSelect from "react-select/creatable";
import { FillerWrapper } from "../../../../../components/LoadingFiller";
import { getAllTag } from "../../../../../redux/tag/tag.action";

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

const UpdateModal = ({
  username,
  items,
  itemId,
  isOpen,
  setOpen,
  isSearch,
}) => {
  const [images, setImages] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const [imageError, setImageError] = useState({});
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [validAddress, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [latLon, setLatLon] = useState(null);
  const [tagDatas, setTags] = useState([]);
  const [initTags, setInitTags] = useState([]);
  const tags = useSelector((state) => state.tags.list);
  console.log(tags)

  const handleFormSubmit = (data) => {
    console.log(itemImages);
    const [latitude, longitude] = latLon;
    if (latitude && longitude) {
      data = {
        ...data,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    }
    data = {
      ...data,
      tags: tagDatas
    }
    dispatch(updateItem(username, itemId, data, itemImages, isSearch));
    // dispatch(getAllTag());
    setOpen(false);
  };

  const handleChange = (value) => {
    setInitTags(value);
    setTags(
      value.map((val) => {
        if (val.id) {
          return { id: val.id, title: val.value };
        }

        return { title: val.value };
      })
    );
  };

  useEffect(() => {
    setLatLon(null);
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
      setLatLon([
        item.apartment.rent_address.latitude,
        item.apartment.rent_address.longitude,
      ]);
      setInitTags(item.tags.map((val) => {
        if (val.id) {
          return { id: val.id, value: val.title, label: val.title };
        }

        return { value: val.title, label: val.title };
      }));
    }
  }, [item]);

  const toggleModal = () => {
    setOpen(!isOpen);
    setImages(
      item.apartment.image_urls.map((url) => ({
        key: url,
        url,
      }))
    );
    setImageError({});
    if (isEqual(latLon, HANOI_LAT_LON)) {
      setLatLon([
        item.apartment.rent_address.latitude,
        item.apartment.rent_address.longitude,
      ]);
    }
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

  const handleVerifyAddress = async () => {
    const data = formRef.current.values;
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
      street: item.apartment?.rent_address.street,
      homeNumber: item.apartment?.rent_address.home_number,
      district: item.apartment?.rent_address.district,
      city: item.apartment?.rent_address.city,
      country: item.apartment?.rent_address.country,
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
      startDate: Yup.date().required("Required"),
      endDate: Yup.date().required("Required"),
      homeNumber: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    },
  };

  return (
    <>
      {!isEqual(item, {}) && latLon != null && (
        <CustomModal isOpen={isOpen} toggle={toggleModal}>
          {loading && <FillerWrapper />}
          <Toaster />
          <ModalHeader>Update apartment</ModalHeader>
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
                  <CustomInput
                    name="size"
                    id="size"
                    label="Size"
                    type="number"
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
                  <Label className="mt-2">Tags</Label>
                  <CreatableSelect
                    isMulti
                    onChange={handleChange}
                    options={tags?.map((tag) => ({
                      value: tag.title,
                      label: tag.title,
                      id: tag.id,
                    }))}
                    value={initTags}
                  />
                  <Label className="mt-2">Images</Label>
                  <CustomInput
                    name="images"
                    id="images"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    onChange={(e) => handleImageChange(e)}
                    imageValidator={imageError}
                  />
                  <CustomImagePreview>
                    {images.map(({ key, url }) => (
                      <img key={key} src={url} />
                    ))}
                  </CustomImagePreview>
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
                <Button onClick={toggleModal} className="ms-2">
                  Cancel
                </Button>
              </div>
            </CustomForm>
          </CustomModalBody>
        </CustomModal>
      )}
    </>
  );
};

export default UpdateModal;
