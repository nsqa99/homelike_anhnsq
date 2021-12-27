import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import DetailHeader from "./components/DetailHeader.js";
import DetailBody from "./components/body";
import { shortAddress } from "../../utils/index.js";
import { useSelector, useDispatch } from "react-redux";
import { getOneItem, resetItemState } from "../../redux/item/item.action";
import _ from "lodash";
import { useHistory, withRouter } from "react-router-dom";

const ItemDetails = ({ match: { params } }) => {
  const itemId = params?.id;
  const item = useSelector((state) => state.items.item);
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(resetItemState());
    });
    dispatch(getOneItem(itemId));

    return () => unlisten();
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
          <DetailBody
            item={item}
            isAuthenticated={authData?.isAuthenticated}
            currentUser={authData?.username}
          />
        </Container>
      ) : null}
    </>
  );
};
export default withRouter(ItemDetails);
