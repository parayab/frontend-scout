import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

class DashboardAccounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountingInfo: {}
    };
  }
  render() {
    return(
      <Header>Contabilidad!</Header>
    );
  }
}
DashboardAccounting.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default DashboardAccounting;