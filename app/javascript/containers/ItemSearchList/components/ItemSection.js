import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CSSModules from "react-css-modules";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import {
  Col,
  Row,
  FormGroup,
  Container,
  Button,
  InputGroup,
  Input,
  InputGroupText,
} from "reactstrap";
import styles from "../styles/user-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import RightPanel from "./RightPanel";
import { RouterLink } from "../../../components/custom/RouterLink";
import UserItem from "../../../components/UserItem";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { searchItem } from "../../../redux/item/item.action";
import Item from "./ItemSearch";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemSection = () => {
  const items = useSelector((state) => state.items.list.data);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { query } = useLocation();

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const data = {
        search_text: searchText,
        fields: ["apartment.rent_address.city", "apartment.rent_address.country", "apartment.rent_address.district"]
      }
      
      dispatch(searchItem(data));
    }
  };

  useEffect(() => {
    if (query) {
      const data = {
        search_text: query,
        fields: ["apartment.rent_address.city", "apartment.rent_address.country", "apartment.rent_address.district"]
      }
      dispatch(searchItem(data));
    } else {
      dispatch(searchItem(""));
    }
  }, []);

  return (
    <Container fluid styleName="">
      <Row className="">
        <Col
          sm="12"
          md="5"
          className="d-flex flex-column p-0"
          styleName="item__wrapper"
        >
          <div className="d-flex justify-content-center">
            <Input
              id="search_text"
              name="search_text"
              placeholder="Search address"
              type="text"
              className="mt-3 mb-5"
              style={{ width: "80%" }}
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div>
            {!isEmpty(items) ? (
              items.map((item) => {
                return <Item item={item} key={item.id} />;
              })
            ) : (
              <span className="fs-5 fw-bold">No result</span>
            )}
          </div>
        </Col>
        <Col xs="6" md="7" className="p-0">
          <RightPanel items={items} />
        </Col>
      </Row>
    </Container>
  );
};

export default CSSModules(ItemSection, styles, { allowMultiple: true });
