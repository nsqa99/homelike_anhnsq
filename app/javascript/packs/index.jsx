import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store, persistor } from "redux/store";
import { Provider } from 'react-redux'
import Containers from '../containers'
import { getAllItems } from "../redux/item/item.action";
import { PersistGate } from "redux-persist/integration/react";

document.addEventListener('DOMContentLoaded', () => {
  store.dispatch(getAllItems());
  
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Containers />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
})
