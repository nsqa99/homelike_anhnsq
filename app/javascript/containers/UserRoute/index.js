import React from "react";
import { useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

const UserRoute = ({ children, ...props }) => {
  const { isAdmin } = props;

  const render = useCallback(
    () => (!isAdmin ? children : <Redirect to="/admin" />),
    [isAdmin, children]
  );

  return <Route {...props} render={render} />;
};

export default UserRoute;
