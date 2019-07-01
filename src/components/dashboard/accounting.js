import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Segment } from 'semantic-ui-react';
import moment from 'moment';

/* Falta hacer el request para obtener los datos, el filtro por actividad y quizás paginar porque esta sección puede
llegar a ser absurdamente larga */

class DashboardAccounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      accountingInfo: []
    };
  }
  componentDidMount() {
    this.setState({ isFetching: true });
    this.getAccountingInfo();
    this.setState({ isFetching: false });
  }
  async getAccountingInfo() {
    // Hacer el request cuando el endpoint exista
    const mockData = [
      { id: 0, amount: 10000, income: false, category: 'actividad', date: "2019-01-01" },
      { id: 1, amount: 20000, income: false, category: 'bingo', date: "2019-01-02" },
      { id: 2, amount: 30000, income: false, category: 'carpas', date: "2019-01-03" },
      { id: 3, amount: 100000, income: true, category: 'donación', date: "2019-01-04" },
      { id: 4, amount: 45660, income: false, category: 'actividad', date: "2019-01-05" },
      { id: 5, amount: 349000, income: true, category: 'bingo', date: "2019-01-06" },
      { id: 6, amount: 2000000, income: true, category: 'buses', date: "2019-01-07" },
      { id: 7, amount: 100000, income: true, category: 'donación', date: "2019-01-08" },
    ];
    this.setState({ accountingInfo: mockData });
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

        </Table>
      </Segment>
    );
  }
}
DashboardAccounting.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default DashboardAccounting;