import { useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {
  const { isAuthenticated } = props;

  const render = useCallback(
    () => (isAuthenticated ? children : <Redirect to="/" />),
    [isAuthenticated, children]
  );

  return <Route {...props} render={render} />;
};

export default PrivateRoute;
