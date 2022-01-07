import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { Button, Col, Container, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/auth.action";
import NotificationToast from "../../components/Toast";
import LoginImg from "../../assets/images/login.jpg";

const Login = () => {
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

  const handleLogin = () => {
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
  }, [isAuthenticated, history, username]);

  return (
    <div styleName="login__wrapper">
      <Container styleName="login__container">
        <NotificationToast />
        <div className="d-flex justify-content-around w-100">
          <img src={LoginImg} styleName="login__img" />
          <div styleName="login__credentials" className="ms-auto">
            <span className="fs-2 fw-bold">Welcome to HomeLike</span>
            <div className="mt-5">
              <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="username"
                  type="email"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  color="danger"
                  className="mt-4 mb-3 w-100"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
                <span>
                  Don't have an account? <Link to="/signup">Sign up</Link>{" "}
                </span>
              </FormGroup>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CSSModules(Login, style);
