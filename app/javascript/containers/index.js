import CommonLayout from "components/CommonLayout";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import Home from "./Home";
import Login from "./Login";

export default function index() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <CommonLayout>
          <Switch>
            <Route path="/user">
              <Users />
            </Route>
            <Route path="/checkout">
              <CheckoutProduct />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </CommonLayout>
      </Switch>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
