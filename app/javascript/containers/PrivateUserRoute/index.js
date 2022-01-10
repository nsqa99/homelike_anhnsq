import React, { useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateUserRoute = ({ children, ...props }) => {
  const { isAuthenticated, isAdmin } = props;

  const render = useCallback(
    () =>
      isAuthenticated ? (
        !isAdmin ? (
          children
        ) : (
          <Redirect to="/admin" />
        )
      ) : (
        <Redirect to="/" />
      ),
    [isAuthenticated, isAdmin, children]
  );

  return <Route {...props} render={render} />;
};

export default PrivateUserRoute;
