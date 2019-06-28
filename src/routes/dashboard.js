import React, { Component } from 'react';
import withAuth from '../components/auth/withAuth';
import { Header } from 'semantic-ui-react';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }
  render() {
    if (this.state.isFetching) {
      return <Header>Cargando...</Header>;
    }
    return <Header>Dashboard pulento!</Header>;
  }

}

export default withAuth(Dashboard)