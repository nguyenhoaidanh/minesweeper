import React from "react";
import ReactDOM from "react-dom";
import App from "containers/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootSaga from "sagas/index";
import rootReducer from "reducers/index";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
