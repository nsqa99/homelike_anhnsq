import CommonLayout from "components/CommonLayout";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CommonSocialLayout from "../components/CommonSocialLayout";
import Home from "./Home";
import ItemDetails from "./ItemDetails";
import Login from "./Login";

export default function index() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        
        <Route path="/social">
          <CommonSocialLayout>
            <Switch>
              <Route path="/feeds" />
              <Route path="/posts" />
            </Switch>
          </CommonSocialLayout>
        </Route>

        <CommonLayout>
          <Switch>
            <Route path="/user">
              <Users />
            </Route>
            <Route path="/items/:id" component={ItemDetails} />
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
