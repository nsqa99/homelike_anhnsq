import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../redux/user/user.action";
import SocialHeaders from "../SocialHeaders";

const CommonSocialLayout = ({ children }) => {
  const authData = useSelector((state) => state.auth.data);
  const userData = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authData) {
      dispatch(getOneUser(authData.username));
    }
  }, []);
  return (
    <div className="">
      <SocialHeaders
        isAuthenticated={authData?.isAuthenticated}
        username={authData.username}
        avatar={userData?.avatar}
      />
      {children}
    </div>
  );
};

export default CommonSocialLayout;
