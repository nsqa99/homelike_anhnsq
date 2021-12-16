import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducer";
import rootSaga from "./saga";

import storage from "redux-persist/lib/storage";

import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  persistReducer(persistConfig, reducers)
);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let enhancers = [
  applyMiddleware(...middlewares)
];

const store = createStore(persistedReducer, compose(...enhancers));

const persistor = persistStore(store);

// const { persistor, store } = configureStore(middlewares);
sagaMiddleware.run(rootSaga);

export { store, persistor };
