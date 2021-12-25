import * as React from "react";
import { Admin, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Provider } from "react-redux";
import createAdminStore from "../../redux/admin/createAdminStore";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminContainer = ({ history }) => (
  <Provider
    store={createAdminStore({
      dataProvider,
      history,
    })}
  >
    <Admin dataProvider={dataProvider} history={history} title="My Admin">
      <Resource name="users" list={ListGuesser} />
    </Admin>
  </Provider>
);

export default AdminContainer;
