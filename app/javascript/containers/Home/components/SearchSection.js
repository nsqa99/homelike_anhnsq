import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import {
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
import { searchItem } from "../../../redux/item/item.action";

const OptionWrapper = styled(FlexCentered)`
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

const SearchSection = () => {
  const [searchText, setSearchText] = useState("");
  const [sorts, setSorts] = useState({
    newest: false,
    highest: false,
  });
  const [priceRange, setPriceRange] = useState({
    low: "",
    high: "",
  });
  const [filters, setFilters] = useState({
    search_text: "",
    sort: [],
    filters: {
      price: {
        op: "range",
        field: "price",
      },
    },
  });
  const dispatch = useDispatch();

  const handleSearch = () => {
    const data = { ...filters, filters: Object.values(filters.filters) };
    dispatch(searchItem(data));
  };

  const handleClear = () => {
    const data = {
      search_text: "",
      sort: [],
      filters: {
        price: {
          op: "range",
          field: "price",
        },
      },
    };
    setSearchText("");
    setSorts({ ...sorts, newest: false, highest: false });
    setPriceRange({ ...priceRange, low: "", high: "" });
    setFilters({ ...filters, ...data });
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    setFilters({ ...filters, search_text: e.target.value });
  };

  const handleNewestFilter = (e) => {
    setSorts({ ...sorts, newest: e.target.checked });
    if (e.target.checked) {
      setFilters({
        ...filters,
        sort: [...filters.sort, ["id", "asc"]],
      });
    } else {
      setFilters({
        ...filters,
        sort: filters.sort.filter((data) => !_.isEqual(data, ["id", "asc"])),
      });
    }
  };
  const handleHighestRateFilter = (e) => {
    setSorts({ ...sorts, highest: e.target.checked });
    if (e.target.checked) {
      setFilters({
        ...filters,
        sort: [...filters.sort, ["rate", "desc"]],
      });
    } else {
      setFilters({
        ...filters,
        sort: filters.sort.filter((data) => !_.isEqual(data, ["rate", "desc"])),
      });
    }
  };
  const handleMinPriceFilter = (e) => {
    setPriceRange({ ...priceRange, low: e.target.value });

    setFilters({
      ...filters,
      filters: {
        ...filters.filters,
        price: {
          ...filters.filters.price,
          value_low: e.target.value,
        },
      },
    });
  };

  const handleMaxPriceFilter = (e) => {
    setPriceRange({ ...priceRange, high: e.target.value });

    setFilters({
      ...filters,
      filters: {
        ...filters.filters,
        price: {
          ...filters.filters.price,
          value_high: e.target.value,
        },
      },
    });
  };
  // console.log(filters)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filters.sort]);

  return (
    <Row styleName="search-section__wrapper">
      <Label for="search_text" styleName="color--red" className="mt-5">
        Where?
      </Label>
      <div className="d-flex">
        <InputGroup>
          <Input
            id="search_text"
            name="search_text"
            placeholder="Start your search"
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            onKeyDown={handleKeyDown}
          />
          <InputGroupText>
            <LocationOnIcon styleName="search-icon" />
          </InputGroupText>
        </InputGroup>
        <div className="d-flex">
          <Button
            color="danger"
            onClick={handleSearch}
            styleName="btn-danger_custom"
            className="ms-3 me-2"
          >
            Search
          </Button>

          <Button
            color="primary"
            className="d-flex align-items-center"
            onClick={handleClear}
          >
            <ClearIcon />
            Clear
          </Button>
        </div>
      </div>

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
                    <Input
                      type="checkbox"
                      onChange={handleNewestFilter}
                      checked={sorts.newest}
                    />
                    <Label check>Oldest</Label>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      onChange={handleHighestRateFilter}
                      checked={sorts.highest}
                    />
                    <Label check>Highest rate</Label>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Min price"
                    onChange={handleMinPriceFilter}
                    value={priceRange.low}
                  />
                </Col>
                <Col md="3">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Max price"
                    onChange={handleMaxPriceFilter}
                    value={priceRange.high}
                  />
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
