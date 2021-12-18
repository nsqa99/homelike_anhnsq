import { Link } from "react-router-dom";
import styled from "styled-components";

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: black;
  }
`;
