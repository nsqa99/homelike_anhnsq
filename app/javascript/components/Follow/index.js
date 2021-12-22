import React, { useState } from "react";
import CSSModules from "react-css-modules";
import style from "./style.module.scss";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import UserItem from "../UserItem";
import styled from "styled-components";

const CustomModalBody = styled(ModalBody)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 40vh;
`;
const CustomModal = styled(Modal)`
  .modal-content {
    overflow: hidden;
    border-radius: 10px;
  }
`;

const Follow = ({ user, follower }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const followList = [
    {
      id: 1,
      username: "nsqa99",
      user_full_name:
        "Anh Nguyen Sy QuangAnh Nguyen Sy QuanAnh Nguyen Sy QuanAnh Nguyen Sy Quan",
      created_at: "2021-12-12",
      email: "test@example.com",
      address: "HN, VN",
      follower_count: 100,
      following_count: 1000,
    },
    {
      id: 2,
      username: "nsqa",
      user_full_name: "Lorem 1",
      created_at: "2021-12-12",
      email: "test1@example.com",
      address: "HN, VN",
      follower_count: 100,
      following_count: 1000,
    },
    {
      id: 3,
      username: "nsqa",
      user_full_name: "Lorem 345",
      created_at: "2021-12-12",
      email: "test2@example.com",
      address: "HN, VN",
      follower_count: 100,
      following_count: 1000,
    },
    {
      id: 4,
      username: "nsqa99",
      user_full_name:
        "Anh Nguyen Sy QuangAnh Nguyen Sy QuanAnh Nguyen Sy QuanAnh Nguyen Sy Quan",
      created_at: "2021-12-12",
      email: "test@example.com",
      address: "HN, VN",
      follower_count: 100,
      following_count: 1000,
    },
    {
      id: 5,
      username: "nsqa",
      user_full_name: "Lorem 1",
      created_at: "2021-12-12",
      email: "test1@example.com",
      address: "HN, VN",
      follower_count: 100,
      following_count: 1000,
    },
    {
      id: 6,
      username: "nsqa",
      user_full_name: "Lorem 345",
      created_at: "2021-12-12",
      email: "test2@example.com",
      address: "HN, VN",
      follower_count: 100,
      following_count: 1000,
    },
  ];

  return (
    <>
      <div styleName="follow" onClick={toggleModal}>
        <span>{user.follower_count}</span>
        {follower ? "Followers" : "Following"}
      </div>
      <CustomModal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {follower ? "Followers" : "Following"}
        </ModalHeader>
        <CustomModalBody>
          {followList.map((follow) => (
            <UserItem
              user={follow}
              small
              follower={follower}
              following={!follower}
            />
          ))}
        </CustomModalBody>
      </CustomModal>
    </>
  );
};

export default CSSModules(Follow, style, { allowMultiple: true });
