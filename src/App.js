import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from './routes';
import './App.css';

export default class App extends Component {

  render() {
    return(
      <div className="app-container">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    );
  }
}