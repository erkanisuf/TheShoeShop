import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./Context/Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdateAdress from "./components/User/UpdateAdress";

ReactDOM.render(
  <Router>
    <Context>
      <App />
    </Context>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
