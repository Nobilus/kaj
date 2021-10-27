import React from "react";
import ReactDOM from "react-dom";
// import "Style/index.css";
import "./Style/index.css";
import reportWebVitals from "./reportWebVitals";
import { Routes } from "./Utils/routes";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import { compose, createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./Reducers";
import { loadState, saveState } from "./Utils/fp/state";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storedState = loadState();
const store = createStore(allReducers, storedState, composeEnhancers());
store.subscribe(() => {
  saveState({
    shop: store.getState().shop,
  });
});

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
