import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Badge, Button, Container, Input, Table } from "reactstrap";
import { formatDate, fullAddress, capitalizeFirstLetter } from "../../../utils";
import Avatar from "../../../constants/images/Avatar.png";
import styled from "styled-components";
import CustomPagination from "../../../components/Pagination";
import { isEmpty } from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RouterLink } from "../../../components/custom/RouterLink";
import NotificationToast from "../../../components/Toast";
import BlockIcon from "@material-ui/icons/Block";
import { searchUser } from "../../../redux/user/user.action";
import DeleteModal from "../modals/DeleteModal";

const ImageWrapper = styled.div`
  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }
`;

const UserList = () => {
  const authData = useSelector((state) => state.auth.data);
  const users = useSelector((state) => state.users.listES);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchText, setSearchText] = useState({
    search_text: ""
  });

  // const handleDeleteModal = (id) => {
  //   setSelectedorder(id);
  //   setDeleteModalOpen(true);
  // };

  // const handleUpdateModal = (id) => {
  //   setSelectedorder(id);
  //   setUpdateModalOpen(true);
  // };

  const handleViewModal = (id) => {};

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(searchUser(searchText));
    }
  };

  useEffect(() => {
    dispatch(searchUser(searchText));
  }, []);

  return (
    <Container className="mt-3">
      <NotificationToast />
      <div className="d-flex justify-content-between mb-2">
      <div className="fs-3 fw-bold">Users</div>
      <Input
        style={{ width: "30%" }}
        placeholder="Type here to search"
        value={searchText.search_text}
        onChange={(e) => setSearchText({...searchText, search_text: e.target.value})}
        onKeyDown={handleSearch}
      />
      </div>
      {users &&
        (!isEmpty(users.data) ? (
          <>
            <Table responsive hover styleName="order__table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th></th>
                  <th style={{ width: "15%" }}>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Followers</th>
                  <th>Following</th>
                  <th>Join at</th>
                  <th>Status</th>
                  <th style={{ width: "20%" }}></th>
                </tr>
                {users.data.map((user) => {
                  return (
                    <>
                      <tr>
                        <td>{user.id}</td>
                        <td>
                          <ImageWrapper>
                            <img
                              className="rounded-circle"
                              src={user.avatar_url || Avatar}
                            />
                          </ImageWrapper>
                        </td>
                        <td>{user.user_full_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.follower_count}</td>
                        <td>{user.following_count}</td>
                        <td>{formatDate(user.created_at)}</td>
                        <td>
                          <Badge
                            color={
                              user.status === "active" ? "primary" : "danger"
                            }
                            pill
                          >
                            {capitalizeFirstLetter(user.status)}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex align-orders-start justify-content-end">
                            {/* <Button
                              color="warning"
                              className="me-2"
                              onClick={() => handleViewModal(user.id)}
                            >
                              Details
                            </Button> */}
                            {user.status === "active" && (
                              // <Button
                              //   color="danger"
                              //   className="me-2"
                              //   // onClick={(e) => handleDeleteModal(order.id)}
                              // >
                              //   <BlockIcon />
                              // </Button>
                              <DeleteModal userId={user.id} />
                            )}
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <CustomPagination
              totalPages={users.pagination.total_pages}
              currentPage={users.pagination.page}
              fn={(options) => dispatch(searchUser(searchText, options))}
            />
          </>
        ) : (
          <span className="fs-5 fw-bold">No users found</span>
        ))}
    </Container>
  );
};

export default UserList;
