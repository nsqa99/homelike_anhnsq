import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, FormGroup, Input, Container } from "reactstrap";
import styles from "../styles/item-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import Item from "./Item";
import { dispatch } from "react-hot-toast";
import { getAllItems } from "../../../redux/item/item.action";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemSection = () => {
  const [isOpen, setOpen] = useState(false);
  const items = useSelector((state) => state.items.list);

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <Container fluid styleName="item__container">
      <Container>
        <FilterWrapper>
          <div styleName="item__list--title">Recent Listings</div>
          <FormGroup>
            <Input
              id="filter"
              name="filter"
              type="select"
              styleName="filter-select"
            >
              <option>Sorting</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
            </Input>
          </FormGroup>
        </FilterWrapper>
        <Row>
          {items
            ? items.map((item) => {
                return (
                  <Col key={item.id} xl="3" lg="4" md="6" sm="12">
                    <Item item={item} />
                  </Col>
                );
              })
            : "No items found"}
        </Row>
      </Container>
    </Container>
  );
};

export default CSSModules(ItemSection, styles, { allowMultiple: true });
