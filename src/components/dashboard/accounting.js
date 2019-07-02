import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Segment, Pagination } from 'semantic-ui-react';
import moment from 'moment';

/* Falta hacer el request para obtener los datos, el filtro por actividad y quizás paginar porque esta sección puede
llegar a ser absurdamente larga */

class DashboardAccounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      accountingInfo: [],
      totalPages: 1,
      pageSize: 2,
      currentPage: 1,
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentDidMount() {
    this.getAccountingInfo();
  }
  async getAccountingInfo() {
    // Hacer el request cuando el endpoint exista
    this.setState({ isFetching: true});
    const { currentPage, pageSize} = this.state;
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction?page=${currentPage - 1}&pageSize=${pageSize}`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ accountingInfo: resJson.transactions, totalPages: resJson.totalPages });
    }
    this.setState({ isFetching: false });
  }
  onPageChange(event, data) {
    this.setState({ currentPage: data.activePage }, this.getAccountingInfo);
  }
  render() {
    return(
      <Segment loading={this.state.isFetching}>
        <Header>Contabilidad</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Categoría</Table.HeaderCell>
              <Table.HeaderCell>Monto</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Tipo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.accountingInfo.map(transaction => {
              return (
              <Table.Row key={transaction.id} negative={!transaction.income}>
                <Table.Cell>{transaction.category}</Table.Cell>
                <Table.Cell>{transaction.amount}</Table.Cell>
                <Table.Cell>{moment(transaction.date).format('LL')}</Table.Cell>
                <Table.Cell>{transaction.income ? 'Ingreso' : 'Gasto' }</Table.Cell>
              </Table.Row>
              )
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <Pagination
                  floated="right"
                  totalPages={this.state.totalPages}
                  defaultActivePage={this.state.currentPage}
                  onPageChange={this.onPageChange}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

        </Table>
      </Segment>
    );
  }
}
DashboardAccounting.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default DashboardAccounting;