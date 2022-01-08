import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import PublicIcon from "@material-ui/icons/Public";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import MapIcon from '@material-ui/icons/Map';
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
} from "reactstrap";
import Avatar from "../Avatar";
import { FlexCentered } from "../../common/styles";
import styled from "styled-components";
import { CustomNavLink } from "../custom/NavLink";
import { RouterLink } from "../custom/RouterLink";
import { logout } from "../../redux/auth/auth.action";
// import { auth } from "firebase";

const AvatarDropdown = styled(FlexCentered)`
  justify-content: space-between;
  border: 1px solid grey;
  width: 100px;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
`;

const Headers = ({ username, avatar, isAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignout = () => {
    if (isAuthenticated) {
      dispatch(logout());
      history.push("/signin");
    }
  };

  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Navbar color="light" expand={true} light className="sticky-top">
      <Link to="/" className="navbar-brand text-danger fw-bold">
        Home Like
      </Link>
      
      {isAuthenticated ? (
        <Nav className="ms-auto" navbar>
          <CustomNavLink tag={Link} to="/search">
            <Button color="danger" styleName="header__btnSwitch">
              <MapIcon className="me-2" />
              Search apartments on Map
            </Button>
          </CustomNavLink>
          <CustomNavLink tag={Link} to="/social">
            <Button color="danger" styleName="header__btnSwitch">
              <PublicIcon className="me-2" />
              Connect with friends
            </Button>
          </CustomNavLink>
          <CustomNavLink tag={Link} to={`/host/${username}`}>
            <Button color="danger" styleName="header__btnSwitch">
              <SupervisedUserCircleIcon className="me-2" />
              Switch to hosting
            </Button>
          </CustomNavLink>
          <Dropdown isOpen={isOpen} toggle={toggle} nav inNavbar>
            <AvatarDropdown onClick={toggle}>
              <MenuIcon />
              <Avatar src={avatar} />
            </AvatarDropdown>
            <DropdownMenu styleName="dropdown-menu--right-align">
              <RouterLink to={`/social/users/${username}`}>
                <DropdownItem>Account: {username}</DropdownItem>
              </RouterLink>
              <RouterLink to={`/users/${username}/orders`}>
                <DropdownItem>Orders</DropdownItem>
              </RouterLink>
              <DropdownItem divider />
              <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      ) : (
        <Nav className="ms-auto" navbar>
          <CustomNavLink tag={Link} to="/signin">
            <Button color="danger" styleName="header__btnSwitch">
              <PublicIcon className="me-2" />
              Sign in
            </Button>
          </CustomNavLink>
        </Nav>
      )}
    </Navbar>
  );
};

export default CSSModules(Headers, styles, { allowMultiple: true });
