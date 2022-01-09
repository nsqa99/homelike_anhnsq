import React, { useEffect, useState } from "react";
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

const Follow = ({ user, follower, currentUser }) => {
  const [open, setOpen] = useState(false);
  const [isOutsider, setOutSider] = useState(false);
  const toggleModal = () => {
    const count = follower ? user.follower_count : user.following_count;
    setOpen(!open);
  };

  const list = follower ? user.follower_users : user.following_users;

  useEffect(() => {
    if (user && currentUser) {
      setOutSider(user.username !== currentUser);
    }
  }, [user, currentUser]);

  return (
    <>
      <div styleName="follow" onClick={toggleModal}>
        <span>{follower ? user.follower_count : user.following_count}</span>
        {follower ? "Followers" : "Following"}
      </div>
      <CustomModal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {follower ? "Followers" : "Following"}
        </ModalHeader>
        <CustomModalBody>
          {list &&
            (list.length > 0 ? (
              list.map((follow) => (
                <UserItem
                  key={follow.id}
                  user={follow}
                  small
                  follower={follower}
                  following={!follower}
                  currentUser={currentUser}
                  outsider={isOutsider}
                />
              ))
            ) : (
              <div className="fs-5 fw-bold text-center">No results</div>
            ))}
        </CustomModalBody>
      </CustomModal>
    </>
  );
};

export default CSSModules(Follow, style, { allowMultiple: true });
