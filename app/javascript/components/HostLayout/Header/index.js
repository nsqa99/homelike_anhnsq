import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import DescriptionIcon from "@material-ui/icons/Description";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PublicIcon from "@material-ui/icons/Public";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Nav,
  Navbar,
  Button,
  NavLink,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Avatar from "../../Avatar";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import { CustomNavLink } from "../../custom/NavLink";
import { RouterLink } from "../../custom/RouterLink";
// import { auth } from "firebase";

const AvatarDropdown = styled(FlexCentered)`
  justify-content: space-between;
  border: 1px solid grey;
  width: 100px;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
`;

const Header = () => {
  // const history = useHistory();
  // const login = () => {
  //   if (user) {
  //     auth().signOut();
  //     history.push("/login");
  //   }
  // };
  const [isOpen, setOpen] = useState(false);
  const authData = useSelector((state) => state.auth.data);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Navbar color="light" expand={true} light className="sticky-top">
      <RouterLink to="/" className="navbar-brand">
        HomeLike
      </RouterLink>
      <RouterLink to={`/host/${authData.username}`} className="navbar-brand">
        Items
      </RouterLink>
      <RouterLink to={`/host/${authData.username}/orders`} className="navbar-brand">
        Orders
      </RouterLink>

      <Nav className="ms-auto" navbar>
        <CustomNavLink tag={Link} to="/social">
          <Button color="danger" styleName="header__btnSwitch">
            <PublicIcon className="me-2" />
            Connect with friends
          </Button>
        </CustomNavLink>
        <CustomNavLink tag={Link} to="/">
          <Button color="danger" styleName="header__btnSwitch">
            <SupervisedUserCircleIcon className="me-2" />
            Switch to customer
          </Button>
        </CustomNavLink>
        <Dropdown isOpen={isOpen} toggle={toggle} nav inNavbar>
          <AvatarDropdown onClick={toggle}>
            <MenuIcon />
            <Avatar />
          </AvatarDropdown>
          <DropdownMenu styleName="dropdown-menu--right-align">
              <RouterLink to={`/host/${authData.username}`}>
                <DropdownItem>Account: {authData.username}</DropdownItem>
              </RouterLink>
            <DropdownItem>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CSSModules(Header, styles, { allowMultiple: true });
