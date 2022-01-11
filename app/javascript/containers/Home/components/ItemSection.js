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
import { getAllTag } from "../../../redux/tag/tag.action";
import Select from "react-select";

const FilterWrapper = styled(FlexCentered)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ItemSection = () => {
  const [select, setSelect] = useState("none");
  const [filter, setFilter] = useState({
    filters: [],
    sort: [],
  });
  const items = useSelector((state) => state.items.list.data);
  const tags = useSelector((state) => state.tags.list);
  const [tagDatas, setTags] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchItem(""));
    if (!tags) {
      dispatch(getAllTag());
    }
  }, []);

  const handleSelect = (e) => {
    if (e.target.value !== "none") {
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
  };

  const handleChange = (value) => {
    setFilter({
      ...filter,
      filters: value.map((val) => {
        return {
          field: "tags.id",
          value: val.id,
        };
      }),
    });

    setTags(value);
  };

  useEffect(() => {
    dispatch(searchItem(filter));
  }, [select, tagDatas]);

  return (
    <Container fluid styleName="item__container">
      <Container>
        <FilterWrapper>
          <div styleName="item__list--title">Recent Apartments</div>
          <Row
            className="d-flex align-items-center justify-content-end"
            style={{ width: "80%" }}
          >
            <Col xs="6">
              <Select
                isMulti
                options={tags?.map((tag) => ({
                  value: tag.title,
                  label: tag.title,
                  id: tag.id,
                }))}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={{
                  // Fixes the overlapping problem of the component
                  menu: provided => ({ ...provided, zIndex: 9999 })
                }}
              />
            </Col>
            <Col xs="4">
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
            </Col>
          </Row>
        </FilterWrapper>
        <Row>
          {!_.isEmpty(items) ? (
            items.map((item) => {
              return (
                <Col key={item.id} lg="4" md="6" sm="12">
                  <Item item={item} />
                </Col>
              );
            })
          ) : (
            <span className="fs-5 fw-bold">No apartments found</span>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default CSSModules(ItemSection, styles, { allowMultiple: true });
