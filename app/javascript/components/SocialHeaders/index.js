import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import PublicIcon from "@material-ui/icons/Public";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import {
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Nav,
  Navbar,
  Button,
  NavLink,
} from "reactstrap";
import Avatar from "../Avatar";
import { FlexCentered } from "../../common/styles";
import styled from "styled-components";
import { CustomNavLink } from "../custom/NavLink";
// import { auth } from "firebase";

const AvatarDropdown = styled(FlexCentered)`
  justify-content: space-between;
  border: 1px solid grey;
  width: 100px;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
`;

const SocialHeaders = () => {
  // const history = useHistory();
  // const login = () => {
  //   if (user) {
  //     auth().signOut();
  //     history.push("/login");
  //   }
  // };

  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Navbar color="light" expand={true} light className="sticky-top">
      <Link to="/" className="navbar-brand">
        Home Like
      </Link>
      <Nav className="ms-auto" navbar>
        <CustomNavLink tag={Link} to="/">
          <Button color="danger" outline className="d-flex align-items-center">
            <ArrowBackIosIcon className="" />
            Back
          </Button>
        </CustomNavLink>
        <CustomNavLink tag={Link} to="/host">
            <Button color="danger" styleName="header__btnSwitch">
              <SupervisedUserCircleIcon className="me-2" />
                Switch to hosting
            </Button>
          </CustomNavLink>
        <Dropdown isOpen={isOpen} toggle={toggle} nav inNavbar>
          <AvatarDropdown onClick={toggle}>
            <MenuIcon />
            <Avatar />
          </AvatarDropdown>
          <DropdownMenu styleName="dropdown-menu--right-align">
            <DropdownItem>Account</DropdownItem>
            <DropdownItem>Orders</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CSSModules(SocialHeaders, styles, { allowMultiple: true });
