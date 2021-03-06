import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { logout } from '../../../redux/auth/auth.action'
import { getOneUser } from "../../../redux/user/user.action";

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
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data);
  const userData = useSelector((state) => state.users.authUser);

  useEffect(() => {
    if (authData) {
      dispatch(getOneUser(authData.username, true));
    }
  }, []);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const handleSignout = () => {
    if (authData.isAuthenticated) {
      dispatch(logout());
      history.push("/signin");
    }
  };

  return (
    <Navbar color="light" expand={true} light className="sticky-top">
      <RouterLink to="/" className="navbar-brand text-danger fw-bold">
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
            <Avatar avatar={userData?.avatar} />
          </AvatarDropdown>
          <DropdownMenu styleName="dropdown-menu--right-align">
              <RouterLink to={`/host/${authData.username}`}>
                <DropdownItem>Account: {authData.username}</DropdownItem>
              </RouterLink>
            <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CSSModules(Header, styles, { allowMultiple: true });
