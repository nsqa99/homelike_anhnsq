import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import { Button, Col, Container, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/auth.action";

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
    <Container styleName="login__container">
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>
          Username
        </Label>
        <Col sm={10}>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="username"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>
          Password
        </Label>
        <Col sm={10}>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
        <Button color="danger" className="mt-5" onClick={handleLogin}>
          Sign in
        </Button>
      </FormGroup>
    </Container>
  );
};
export default CSSModules(Login, style);
