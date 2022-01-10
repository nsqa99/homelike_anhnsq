import CommonLayout from "components/CommonLayout";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CommonSocialLayout from "../components/CommonSocialLayout";
import Home from "./Home";
import ItemDetails from "./ItemDetails";
import Login from "./Login";
import Register from "./Register";
import Feed from "./Feeds";
import SocialSearchList from "./SocialSearchList";
import PostDetails from "./PostDetails";
import Profile from "./Profile";
import OrderDetails from "./OrderDetails";
import HostLayout from "../components/HostLayout";
import Item from "./Host/components/item";
import OrderList from "./OrderList";
import ItemSearchList from "../containers/ItemSearchList";
import MerchantOrderList from "./MerchantOrderList";
import AdminLayout from "../components/AdminLayout";
import LoginAdmin from "./LoginAdmin";
import { useSelector } from "react-redux";
import UserRoute from "./UserRoute";
import UserList from "../components/admin/UserList";
import PrivateAdminRoute from "./PrivateAdminRoute";

export default function index() {
  const authData = useSelector((state) => state.auth.data);

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/admin/signin">
          <LoginAdmin />
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
              <Route
                path="/host/:username/orders"
                component={MerchantOrderList}
              />
              <Route path="/host/:username" component={Item} />
            </Switch>
          </HostLayout>
        </Route>
        <PrivateAdminRoute
          path="/admin"
          isAdmin={authData?.isAdmin}
          isAuthenticated={authData?.isAuthenticated}
        >
          <AdminLayout>
            <Switch>
              <Route path="/admin" component={UserList} />
            </Switch>
          </AdminLayout>
        </PrivateAdminRoute>

        <CommonLayout>
          <Switch>
            <Route path="/search" component={ItemSearchList} />
            <Route path="/user">
              <Users />
            </Route>
            <Route
              path="/users/:username/orders/:id"
              component={OrderDetails}
            />
            <Route path="/users/:username/orders" component={OrderList} />
            <Route path="/items/:id" component={ItemDetails} />

            <UserRoute path="/" isAdmin={authData?.isAdmin}>
              <Home />
            </UserRoute>
          </Switch>
        </CommonLayout>
      </Switch>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
