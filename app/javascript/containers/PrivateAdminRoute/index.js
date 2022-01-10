import React, { useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateAdminRoute = ({ children, ...props }) => {
  const { isAuthenticated, isAdmin } = props;

  const render = useCallback(
    () =>
      isAuthenticated ? (
        isAdmin ? (
          children
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to="/admin/signin" />
      ),
    [isAuthenticated, isAdmin, children]
  );

  return <Route {...props} render={render} />;
};

export default PrivateAdminRoute;
