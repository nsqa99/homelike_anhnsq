import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, FormGroup, Input, Container } from "reactstrap";
import styles from "../styles/item-section.module.scss";
import { FlexCentered } from "../../../common/styles";
import styled from "styled-components";
import Item from "./Item";
import { getAllItems, searchItem } from "../../../redux/item/item.action";
import _ from "lodash";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemSection = () => {
  const [select, setSelect] = useState("none")
  const [filter, setFilter] = useState({
    sort: [],
  });
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const handleSelect = (e) => {
    if (e.target.value !== 'none') {
      setFilter({
        ...filter,
        sort: [["price", e.target.value]],
      });
    } else {
      setFilter({
        ...filter,
        sort: [],
      });
    }

    setSelect(e.target.value);
  }

  useEffect(() => {
    dispatch(searchItem(filter));
  }, [select])

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
              value={select}
              onChange={handleSelect}
            >
              <option value="none">Filter by</option>
              <option value="asc">Lowest Price</option>
              <option value="desc">Highest Price</option>
            </Input>
          </FormGroup>
        </FilterWrapper>
        <Row>
          {!_.isEmpty(items)
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
