import React from "react";
import Book from "./pages/Book";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Switch>
      {/* <ReactNotification /> */}
      <Route exact component={Login} path="/" />
      <Route exact component={Book} path="/book" />
      <Route exact component={Signup} path="/signup" />
    </Switch>
  );
}

export default App;
