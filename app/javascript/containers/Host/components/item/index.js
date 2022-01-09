import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Button, Container, Input, Table } from "reactstrap";
import { formatDate, fullAddress } from "../../../../utils";
import CreateModal from "./ActionModal/CreateModal";
import DefaultImage from "../../../../constants/images/DefaultImage.png";
import styled from "styled-components";
import CustomPagination from "../../../../components/Pagination";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,
  getAllItemsByUsername,
  searchItem,
} from "../../../../redux/item/item.action";
import DeleteModal from "./ActionModal/DeleteModal";
import UpdateModal from "./ActionModal/UpdateModal";
import ViewModal from "./ActionModal/ViewModal";
import NotificationToast from "../../../../components/Toast";

const ImageWrapper = styled.div`
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const Item = () => {
  const { username } = useParams();
  const items = useSelector((state) => state.items.listNotES);
  const searchItems = useSelector((state) => state.items.list);
  const searchStatus = useSelector((state) => state.items.isSearch);
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(searchStatus);
  const [searchText, setSearchText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteModal = (id) => {
    setSelectedItem(id);
    setDeleteModalOpen(true);
  };

  const handleUpdateModal = (id) => {
    setSelectedItem(id);
    setUpdateModalOpen(true);
  };

  const handleViewModal = (id) => {
    setSelectedItem(id);
    setViewModalOpen(true);
  };

  const filters = {
    search_text: searchText,
    fitlers: {
      field: "merchant.user.username",
      value: username,
    },
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchText === "") {
        setIsSearch(false);
      } else {
        setIsSearch(true);

        dispatch(searchItem(filters));
      }
    }
  };

  useEffect(() => {
    dispatch(getAllItemsByUsername(username));
  }, []);

  return (
    <Container className="mt-5">
      <NotificationToast />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Input
          style={{ width: "30%" }}
          placeholder="Type here to search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
        />
        <CreateModal username={username} />
      </div>
      {!isSearch ? (
        !isEmpty(items.data) ? (
          <>
            <Table responsive hover styleName="item__table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th></th>
                  <th>Title</th>
                  <th style={{ width: "15%" }}>Description</th>
                  <th style={{ width: "15%" }}>Address</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Price</th>
                  <th style={{ width: "25%" }}></th>
                </tr>
                {items.data.map((item) => {
                  let apartment = item.apartment;

                  return (
                    <>
                      <tr>
                        <td>{item.id}</td>
                        <td>
                          <ImageWrapper>
                            <img
                              className="rounded"
                              src={
                                item.apartment.image_urls[0] || DefaultImage
                              }
                            />
                          </ImageWrapper>
                        </td>
                        <td>{apartment.title}</td>
                        <td>{item.description}</td>
                        <td>{fullAddress(apartment.rent_address)}</td>
                        <td>{formatDate(item.initial_start_date)}</td>
                        <td>{formatDate(item.initial_end_date)}</td>
                        <td>
                          <CurrencyFormat
                            value={item.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </td>
                        <td>
                          <div className="d-flex align-items-start justify-content-end">
                            <Button
                              color="warning"
                              className="me-2"
                              onClick={(e) => handleViewModal(item.id)}
                            >
                              View
                            </Button>
                            <Button
                              color="primary"
                              className="me-2"
                              onClick={(e) => handleUpdateModal(item.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              color="danger"
                              className="me-2"
                              onClick={(e) => handleDeleteModal(item.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <CustomPagination
              totalPages={items.pagination.total_pages}
              currentPage={items.pagination.page}
              fn={(options) =>
                dispatch(getAllItemsByUsername(username, options))
              }
            />
          </>
        ) : (
          <span className="fs-5 fw-bold">No apartments found</span>
        )
      ) : !isEmpty(searchItems.data) ? (
        <>
          <Table responsive hover styleName="item__table">
            <tbody>
              <tr>
                <th>ID</th>
                <th></th>
                <th>Title</th>
                <th style={{ width: "15%" }}>Description</th>
                <th style={{ width: "15%" }}>Address</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th style={{ width: "25%" }}></th>
              </tr>
              {searchItems.data.map((item) => {
                let apartment = item.apartment;

                return (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td>
                        <ImageWrapper>
                          <img
                            className="rounded"
                            src={item.apartment.image_urls[0] || DefaultImage}
                          />
                        </ImageWrapper>
                      </td>
                      <td>{apartment.title}</td>
                      <td>{item.description}</td>
                      <td>{fullAddress(apartment.rent_address)}</td>
                      <td>{formatDate(item.initial_start_date)}</td>
                      <td>{formatDate(item.initial_end_date)}</td>
                      <td>
                        <CurrencyFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-start justify-content-end">
                          <Button
                            color="warning"
                            className="me-2"
                            onClick={(e) => handleViewModal(item.id)}
                          >
                            View
                          </Button>
                          <Button
                            color="primary"
                            className="me-2"
                            onClick={(e) => handleUpdateModal(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            className="me-2"
                            onClick={(e) => handleDeleteModal(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <CustomPagination
            totalPages={searchItems.pagination.total_pages}
            currentPage={searchItems.pagination.page}
            fn={(options) => dispatch(searchItem(filters, options))}
          />
        </>
      ) : (
        <span className="fs-5 fw-bold">No apartments found</span>
      )}
      <DeleteModal
        username={username}
        itemId={selectedItem}
        isOpen={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        isSearch={isSearch}
      />

      <UpdateModal
        username={username}
        items={items}
        itemId={selectedItem}
        isOpen={updateModalOpen}
        setOpen={setUpdateModalOpen}
        isSearch={isSearch}
      />

      <ViewModal
        items={items}
        itemId={selectedItem}
        isOpen={viewModalOpen}
        setOpen={setViewModalOpen}
      />
    </Container>
  );
};

export default Item;
