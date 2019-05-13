import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from './routes';

export default class App extends Component {

  render() {
    return(
      <div>
        <Router>
          <div id="app-container">
            <AppRoutes />
          </div>
        </Router>
      </div>
    );
  }
}