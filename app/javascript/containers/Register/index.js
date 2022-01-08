import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/auth.action";
import NotificationToast from "../../components/Toast";
import LoginImg from "../../assets/images/login.jpg";
import { RouterLink } from "../../components/custom/RouterLink";
import { CustomInput } from "../../components/Form/components";
import CustomForm from "../../components/Form";
import * as Yup from "yup";
import { getBlobUrl, isValidImageSize, isValidImageType } from "../../utils";
import styled from "styled-components";
import Avatar from "../../constants/images/Avatar.png";

const AvatarPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 999px;
    border: 1px solid #eee;
    margin-top: 20px;
  }
`;

const Register = () => {
  const history = useHistory();
  const [usernameForm, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, username } = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const loginData = {
    type: "user",
    user: {
      username: usernameForm,
      password,
    },
  };

  const [images, setImages] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
  }, [isAuthenticated, history, username]);

  const fields = {
    initValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
    validations: {
      username: Yup.string()
        .max(20, "Must be at most 20 characters")
        .matches(
          /^(?!.*\s)[a-zA-Z0-9]*_*/g,
          "Special characters and whitespaces are not allowed"
        )
        .required("Required"),
      first_name: Yup.string()
        .max(20, "Must be at most 20 characters")
        .required("Required"),
      last_name: Yup.string()
        .max(20, "Must be at most 20 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone_number: Yup.string()
        .matches(/^[0-9]/g, "Invalid phone number")
        .max(10, "Invalid phone number")
        .min(10, "Invalid phone number")
        .required("Required"),
      password: Yup.string().required("Required"),
      password_confirmation: Yup.string().required("Required"),
    },
  };

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

  const handleImageChange = (e) => {
    const imgs = Array.from(e.target.files);
    setItemImage(imgs[0]);
    if (!isValidImageType(imgs)) {
      setImageError({
        ...{
          invalid: true,
          message: "Image type must be jpg/jpeg/png",
        },
      });
    } else if (!isValidImageSize(imgs)) {
      setImageError({
        ...{
          invalid: true,
          message: "Image size must be less than 2MB",
        },
      });
    } else {
      getBlobUrl(imgs, setImages);
      setImageError({
        ...{
          invalid: false,
          message: "",
        },
      });
    }
  };

  return (
    <div styleName="login__wrapper">
      <Container styleName="login__container">
        <NotificationToast />
        <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center w-100 mb-3">
          {/* <img src={LoginImg} styleName="login__img" /> */}
          <div styleName="login__credentials" className="ms-auto w-100">
            <span className="fs-2 fw-bold">
              Join{" "}
              <RouterLink to="" className="text-danger">
                HomeLike
              </RouterLink>
            </span>
            <div className="mt-5">
              <CustomForm
                fields={fields}
                // handleSubmit={handleFormSubmit}
                // images={images}
                // formRef={formRef}
              >
                <CustomInput name="username" id="username" label="Username" />
                <CustomInput name="email" id="email" label="Email" />
                <CustomInput
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                />
                <CustomInput
                  name="password_confirmation"
                  id="password_confirmation"
                  label="Confirm Password"
                  type="password"
                />
                <CustomInput
                  name="first_name"
                  id="first_name"
                  label="First Name"
                />
                <CustomInput
                  name="last_name"
                  id="last_name"
                  label="Last Name"
                />
                <CustomInput
                  name="phone_number"
                  id="phone_number"
                  label="Phone"
                />
                <CustomInput
                  name="images"
                  id="images"
                  type="file"
                  label="Avatar"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => handleImageChange(e)}
                  imageValidator={imageError}
                />
                {images && images.length > 0 ? (
                  <AvatarPreview>
                    <img src={images[0].url} />
                  </AvatarPreview>
                ) : (
                  <AvatarPreview>
                    <img src={Avatar} />
                  </AvatarPreview>
                )}
                {/* <Row className="p-2">
                  <Col md="12" lg="6">
                  </Col>
                  <Col md="12" lg="6">
                  </Col>
                </Row> */}
                <Button
                  color="danger"
                  type="submit"
                  className="mt-4 mb-3 w-100"
                >
                  JOIN NOW
                </Button>
                <span>
                  Already have an account? <Link to="/signin">Sign in</Link>{" "}
                </span>
              </CustomForm>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CSSModules(Register, style);
