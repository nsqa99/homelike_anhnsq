import Headers from "components/Headers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../redux/user/user.action";

const CommonLayout = ({ children }) => {
  const authData = useSelector((state) => state.auth.data);
  const userData = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser(authData?.username));
  }, []);

  return (
    <div className="">
      <Headers
        isAuthenticated={authData?.isAuthenticated}
        username={userData?.username}
        avatar={userData?.avatar}
      />
      {children}
    </div>
  );
};

export default CommonLayout;
