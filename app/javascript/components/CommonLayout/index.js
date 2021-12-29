import Headers from "components/Headers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../redux/user/user.action";

const CommonLayout = ({ children }) => {
  const authData = useSelector((state) => state.auth.data);
  const userData = useSelector((state) => state.users.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authData) {
      dispatch(getOneUser(authData.username, true));
    }
  }, []);
  
  return (
    <div className="">
      <Headers
        isAuthenticated={authData?.isAuthenticated}
        username={authData.username}
        avatar={userData?.avatar}
      />
      {children}
    </div>
  );
};

export default CommonLayout;
