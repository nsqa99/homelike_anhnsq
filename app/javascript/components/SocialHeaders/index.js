import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import DescriptionIcon from "@material-ui/icons/Description";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
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
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Avatar from "../Avatar";
import { FlexCentered } from "../../common/styles";
import styled from "styled-components";
import { CustomNavLink } from "../custom/NavLink";
import { RouterLink } from "../custom/RouterLink";
// import { auth } from "firebase";

const AvatarDropdown = styled(FlexCentered)`
  justify-content: space-between;
  border: 1px solid grey;
  width: 100px;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
`;

const SocialHeaders = ({ user }) => {
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
      <InputGroup>
        <Input
          type="text"
          placeholder="Find friends around"
          styleName="header__search"
        />

        <InputGroupText>
          <SearchIcon />
        </InputGroupText>
      </InputGroup>

      <Nav className="ms-auto" navbar>
        <CustomNavLink tag={Link} to="/social">
          <Button
            color="danger"
            outline
            className="d-flex align-items-center"
            style={{ borderRadius: 999 }}
          >
            <DescriptionIcon className="" />
            Newsfeed
          </Button>
        </CustomNavLink>
        <Dropdown isOpen={isOpen} toggle={toggle} nav inNavbar>
          <AvatarDropdown onClick={toggle}>
            <MenuIcon />
            <Avatar />
          </AvatarDropdown>
          <DropdownMenu styleName="dropdown-menu--right-align">
            <RouterLink to={`/social/profile/${user?.username || "nsqa99"}`}>
              <DropdownItem>Account</DropdownItem>
            </RouterLink>
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
