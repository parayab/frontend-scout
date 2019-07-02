import React, { Component, Fragment } from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment';

class DashboardAccounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      incomesPerMonth: {},
      expensesPerMonth: {},
      statsTotal: [],
    }
  }
  async componentDidMount() {
    this.getDashboardPerMonth();
    this.setState({ isFetching: true });
    await this.getDashboardTotal();
    this.setState({ isFetching: false });
  }
  async getDashboardTotal() {
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction/dashboard_aggregated`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({statsTotal: resJson.transactions});
    }
  }

  async getDashboardPerMonth() {
    const yearAgo = moment().add(-1, "year");
    const response = await fetch(`/groups/${this.props.groupId}/groupTransaction/dashboard_detail?initialDate=${yearAgo}`);
    if (response.ok) {
      const resJson = await response.json();
      const incomes = {};
      const expenses = {};
      for (let index = 0; index <= 12; index++) {
        const date = moment(yearAgo);
        const name = `${date.format("MMM")} ${date.format("YYYY")}`
        incomes[name] = 0;
        expenses[name] = 0;
        yearAgo.add(1, "month");
      }
      resJson.transactions.forEach(element => {
        const date = moment(element.income_date).add(1, "month");
        const name = `${date.format("MMM")} ${date.format("YYYY")}`
        if (element.income) {
          incomes[name] = element.sum_incomes;
        } else {
          expenses[name] = element.sum_incomes;
        }
      });
      this.setState({ incomesPerMonth: incomes, expensesPerMonth: expenses });
    }
  }

  setOptions() {
    const keys = Object.keys(this.state.incomesPerMonth);
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Ingresos y gastos del último año'
      },
      xAxis: {
        categories: keys
      },
      yAxis: {
        title: {text: "Pesos chilenos"}
      },
      credits: false,
      series: [
        {name: "Ingresos", data: keys.map(key => Number(this.state.incomesPerMonth[key]))},
        {name: "Gastos", data: keys.map(key => -this.state.expensesPerMonth[key])}
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      tooltip: {
        backgroundColor: '#616161',
        borderColor: '#616161',
        borderWidth: 0.5,
        style: {
          color: 'white',
        },
      },
    }
    return options;
  }

  render() {
    const incomes = this.state.statsTotal.find(element => element.income);
    const expenses = this.state.statsTotal.find(element => !element.income);
    const income = incomes ? incomes.sum_incomes : 0;
    const expense = expenses ? expenses.sum_incomes : 0;
    const chartOptions = this.setOptions();

    return(
      <Fragment>
        <Segment loading={this.state.isFetching} style={{marginTop: 0, marginBottom: 0}}>
          <Header>Resumen Contabilidad</Header>
          <Label.Group size='huge'>
            <Label>
              {Number(income).toLocaleString("es")}
              <Label.Detail>Total Ingresos</Label.Detail>
            </Label>
            <Label>
              {Number(expense).toLocaleString("es")}
              <Label.Detail>Total Gastos</Label.Detail>
            </Label>
            <Label floated="right" color={income-expense > 0 ? "green" : "red"}>
              {(income - expense).toLocaleString("es")}
              <Label.Detail>Presupuesto</Label.Detail>
            </Label>
          </Label.Group>
        </Segment>
        <Segment style={{marginTop: 0}}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </Segment>
      </Fragment>
    );
  }
}
export default DashboardAccounting;