import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import {
  DropdownItem,
  Dropdown,
  DropdownMenu,
  Nav,
  Navbar,
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  UncontrolledCollapse,
  Card,
  CardBody,
} from "reactstrap";
import styles from "../styles/search-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";

const OptionWrapper = styled(FlexCentered)`
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

const SearchSection = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Row className="mt-5" styleName="search-section__wrapper">
      <Col md="8">
        <Label for="search_text" styleName="color--red">
          Where?
        </Label>
        <InputGroup>
          <Input
            id="search_text"
            name="search_text"
            placeholder="Start your search"
            type="text"
          />
          <InputGroupText>
            <LocationOnIcon styleName="search-icon" />
          </InputGroupText>
        </InputGroup>
      </Col>

      <Col md="2" className="">
        <Button color="danger" styleName="btn-danger_custom">
          Search
        </Button>
      </Col>

      <Col md="10" className="mt-3">
        <OptionWrapper id="toggler">
          <AddIcon className="me-2" styleName="color--red text-small" />
          More options
        </OptionWrapper>
        
        <UncontrolledCollapse toggler="#toggler">
          <Card>
            <CardBody>
              <Row className="align-items-center">
                <Col md="3">
                  <FormGroup check inline>
                    <Input type="checkbox" />
                    <Label check>Newest</Label>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup check inline>
                    <Input type="checkbox" />
                    <Label check>Highest rate</Label>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <Input type="number" min="10000" placeholder="Min price" />
                </Col>
                <Col md="3">
                  <Input type="number" min="10000" placeholder="Max price" />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </Col>
    </Row>
  );
};

export default CSSModules(SearchSection, styles, { allowMultiple: true });
