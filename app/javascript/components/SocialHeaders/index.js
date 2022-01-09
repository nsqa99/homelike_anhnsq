import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./style.module.scss";
import DescriptionIcon from "@material-ui/icons/Description";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import PublicIcon from "@material-ui/icons/Public";
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
import { logout } from "../../redux/auth/auth.action";
import { searchUser } from "../../redux/user/user.action";
// import { auth } from "firebase";

const AvatarDropdown = styled(FlexCentered)`
  justify-content: space-between;
  border: 1px solid grey;
  width: 100px;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
`;

const SocialHeaders = ({ username, avatar, isAuthenticated }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleSignout = () => {
    if (isAuthenticated) {
      dispatch(logout());
      history.push("/signin");
    }
  };

  const [isOpen, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggle = () => {
    setOpen(!isOpen);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      
      const data = {
        search_text: searchText,
      };

      if (location.pathname !== "/social/search") {
        history.push("/social/search", { query: searchText });
      } else {
        dispatch(searchUser(data));
      }
    }
  };

  return (
    <Navbar color="light" expand={true} light className="sticky-top">
      <Link to="/" className="navbar-brand text-danger fw-bold">
        Home Like
      </Link>
      <InputGroup>
        <Input
          type="text"
          placeholder="Find friends around"
          styleName="header__search"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleKeyDown}
        />

        <InputGroupText>
          <SearchIcon />
        </InputGroupText>
      </InputGroup>

      {isAuthenticated ? (
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
              <Avatar src={avatar} />
            </AvatarDropdown>
            <DropdownMenu styleName="dropdown-menu--right-align">
              <RouterLink to={`/social/users/${username}`}>
                <DropdownItem>Account: {username}</DropdownItem>
              </RouterLink>
              <DropdownItem>Orders</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      ) : (
        <Nav className="ms-auto" navbar>
          <CustomNavLink tag={Link} to="/signin" style={{ width: 150 }}>
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

export default CSSModules(SocialHeaders, styles, { allowMultiple: true });
