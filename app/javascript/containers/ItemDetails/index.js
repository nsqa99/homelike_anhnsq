import React, { useEffect } from "react";
import { Container } from "reactstrap";
import DetailHeader from "./components/DetailHeader.js";
import DetailBody from "./components/body";
import { shortAddress } from "../../utils/index.js";
import { useSelector, useDispatch } from "react-redux";
import { getOneItem } from "../../redux/item/item.action";
import _ from "lodash";

const ItemDetails = ({ match: { params } }) => {
  const itemId = params?.id;
  const item = useSelector((state) => state.items.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneItem(itemId));
  }, []);

  return (
    <>
      {!_.isEqual(item, {}) ? (
        <Container>
          <DetailHeader
            id={itemId}
            price={item?.price}
            title={item?.apartment.title}
            address={item && shortAddress(item?.apartment.rent_address)}
          />
          <DetailBody item={item} />
        </Container>
      ) : null}
    </>
  );
};
export default ItemDetails;
