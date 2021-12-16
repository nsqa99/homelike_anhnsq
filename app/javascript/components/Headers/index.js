import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import {
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Nav,
  Navbar,
  Button,
} from "reactstrap";
import Avatar from "../Avatar";
import { FlexCentered } from "../../common/styles";
import styled from "styled-components";
// import { auth } from "firebase";

const AvatarDropdown = styled(FlexCentered)`
  justify-content: space-between;
  border: 1px solid grey;
  width: 100px;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
`;

const Headers = () => {
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
        <Button color="danger" styleName="header__btnSwitch">
          Switch to hosting
        </Button>
        <Dropdown isOpen={isOpen} toggle={toggle} nav inNavbar>
          <AvatarDropdown onClick={toggle}>
            <MenuIcon />
            <Avatar />
          </AvatarDropdown>
          <DropdownMenu styleName="dropdown-menu--right-align">
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CSSModules(Headers, styles, { allowMultiple: true });
