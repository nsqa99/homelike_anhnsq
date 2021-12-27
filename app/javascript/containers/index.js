import CommonLayout from "components/CommonLayout";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CommonSocialLayout from "../components/CommonSocialLayout";
import Home from "./Home";
import ItemDetails from "./ItemDetails";
import Login from "./Login";
import Feed from "./Feeds";
import SocialSearchList from "./SocialSearchList";
import PostDetails from "./PostDetails";
import Profile from "./Profile";
import OrderDetails from "./OrderDetails";
import HostLayout from "../components/HostLayout";
import Item from "./Host/components/item";

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
              <Route path="/social/posts/:id" component={PostDetails} />
              <Route path="/social/search" component={SocialSearchList} />
              <Route path="/social/users/:username" component={Profile} />
              <Route path="/social" component={Feed} />
            </Switch>
          </CommonSocialLayout>
        </Route>

        <Route path="/host">
          <HostLayout>
            <Switch>
              {/* <Route path="/host/:username/items/:id" component={ItemDetails} /> */}
              <Route path="/host/:username" component={Item} />
            </Switch>
          </HostLayout>
        </Route>

        <CommonLayout>
          <Switch>
            <Route path="/user">
              <Users />
            </Route>
            <Route
              path="/users/:username/orders/:id"
              component={OrderDetails}
            />
            <Route
              path="/items/:id"
              component={ItemDetails}
            />

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
