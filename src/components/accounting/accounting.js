import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Segment, Pagination, Button, Icon, Grid } from 'semantic-ui-react';
import moment from 'moment';
import TransactionForm from './transactionForm';

class Accounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      accountingInfo: [],
      totalPages: 1,
      pageSize: 8,
      currentPage: 1,
      openForm: false
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
  }
  componentDidMount() {
    this.getAccountingInfo();
  }

  async getAccountingInfo() {
    this.setState({ isFetching: true});
    const { currentPage, pageSize} = this.state;
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction?page=${currentPage - 1}&pageSize=${pageSize}`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ accountingInfo: resJson.transactions, totalPages: resJson.totalPages });
    }
    this.setState({ isFetching: false });
  }

  async createTransaction(data) {
    this.setState({ isFetching: true });
    const { currentPage, pageSize} = this.state;
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction?page=${currentPage - 1}&pageSize=${pageSize}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ accountingInfo: resJson.transactions, totalPages: resJson.totalPages, openForm: false });
    }
    this.setState({ isFetching: false });
  }

  async deleteTransaction(event, data) {
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction/${data.transid}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      this.setState(prevstate => {
        const newState = prevstate.accountingInfo.filter(transaction => transaction.id !== data.transid);
        return { accountingInfo: newState }
      });
    }
  }

  onPageChange(event, data) {
    this.setState({ currentPage: data.activePage }, this.getAccountingInfo);
  }

  toggleForm() {
    this.setState(prevState => {
      return { openForm: !prevState.openForm }
    })
  }

  render() {
    return(
      <Segment loading={this.state.isFetching} style={{marginTop: 0}}>
        {this.state.openForm &&
          <TransactionForm
            open={this.state.openForm}
            handleCancel={this.toggleForm}
            groupId={this.props.groupId}
            handleSubmit={this.createTransaction}
          />
        }
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header>Contabilidad - Historial de gastos e ingresos</Header>
            </Grid.Column>
            <Grid.Column>
              <Button icon floated="right" onClick={this.toggleForm}>
                <Icon name='plus' />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Categoría</Table.HeaderCell>
              <Table.HeaderCell>Monto</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Tipo</Table.HeaderCell>
              <Table.HeaderCell>Acción</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.accountingInfo.map(transaction => {
              return (
              <Table.Row key={transaction.id} negative={!transaction.income}>
                <Table.Cell>{transaction.category}</Table.Cell>
                <Table.Cell>{transaction.amount}</Table.Cell>
                <Table.Cell>{moment(transaction.date).add(1, "day").format('LL')}</Table.Cell>
                <Table.Cell>{transaction.income ? 'Ingreso' : 'Gasto' }</Table.Cell>
                <Table.Cell collapsing>
                  <Button size="tiny" icon="delete" color="red" onClick={this.deleteTransaction} transid={transaction.id}/>
                </Table.Cell>
              </Table.Row>
              )
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>
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
Accounting.propTypes = {
  groupId: PropTypes.string.isRequired
};
export default Accounting;