import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./src/components/navigation-bar/Navbar";
import Main from "./src/components/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            {/* navigation bar component. */}
            <Navbar />
            {/* main component. */}
            <Main />
            <ToastContainer />
          </Route>
        </Switch>
      </Router>
    );
  }
}
