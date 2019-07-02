import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class DashboardAccounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      statsPerMoth: [],
      statsTotal: [],
    }
  }
  async componentDidMount() {
    this.setState({ isFetching: true });
    await this.getDashboardTotal();
    this.setState({ isFetching: false });


  }
  async getDashboardTotal() {
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction/dashboard_aggregated`);
    if (response.ok) {
      const resJson = await response.json();
      // const perMonth = resJson.transactions.map(result => {
      //   const returnObj = {};
      //   const type = result.income ? "incomes" : "expenses";
      //   returnObj[type] = result.sum_incomes;
      //   return returnObj;
      // });
      this.setState({statsTotal: resJson.transactions});
    }
  }
  render() {
    console.log(this.state);
    const incomes = this.state.statsTotal.find(element => element.income);
    const expenses = this.state.statsTotal.find(element => !element.income);
    const income = incomes ? incomes.sum_incomes : 0;
    const expense = expenses ? expenses.sum_incomes : 0;

    return(
      <Segment loading={this.state.isFetching}>
        <Header>Resumen Contabilidad</Header>
        <Header as="h5">Total ingresos: { Number(income).toLocaleString("es") }</Header>
        <Header as="h5">Total gastos: { Number(expense).toLocaleString("es") }</Header>
        <Header as="h5">Presupuesto total: { (income - expense).toLocaleString("es") }</Header>




      </Segment>
    );
  }
}
export default DashboardAccounting;