import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import withAuth from '../components/auth/withAuth';
import { Header, Grid, Icon, List } from 'semantic-ui-react';
import moment from 'moment';

import DashboardCalendar from '../components/dashboard/calendar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      groupInfo: {},
      groupMembers: [],
      groupEvents: [],
    };
  }
  async componentDidMount() {
    this.setState({ isFetching: true });
    const allRequests = Promise.all([this.getGroupInfo(), this.getAllMembers(), this.getAllEvents()]);
    allRequests.then(() => {
      this.setState({ isFetching: false });
    });
  }
  async getGroupInfo() {
    const response = await fetch(`/groups/${this.props.groupId}`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ groupInfo: resJson.group });
    }
  }
  async getAllMembers() {
    const response = await fetch(`groups/${this.props.groupId}/users`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ groupMembers: resJson.users });
    }
  }

  async getAllEvents() {
    const response = await fetch(`groups/${this.props.groupId}/groupEvent`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ groupEvents: resJson.groupEvents });
    }
  }
  render() {
    if (this.state.isFetching) {
      return <Header>Cargando...</Header>;
    }
    // return <Header>Dashboard pulento! {this.state.groupInfo.name}</Header>;
    const today = moment();
    const pendingEvents = this.state.groupEvents.filter(event => {
      return event.foundationDate && moment(event.foundationDate).diff(today, "days") >= 0;
    });
    return (
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={2}>
            <Header>
              <Icon name="users"/>
              {this.state.groupInfo.name}
            </Header>
            <List>
              <List.Item>
                <Icon name='right triangle' />
                {this.state.groupMembers.length} {this.state.groupMembers.length === 1 ? 'miembro' : 'miembros' }
              </List.Item>
              <List.Item>
                <Icon name='right triangle' />
                {pendingEvents.length} {pendingEvents.length === 1 ? 'evento pendiente' : 'eventos pendientes' }
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={13}>
            <DashboardCalendar groupId={this.props.groupId} groupEvents={this.state.groupEvents} />
          </Grid.Column>
        </Grid.Row>

      </Grid>

    );
  }

}

Dashboard.propTypes = {
  groupId: PropTypes.string.isRequired,
};
export default withAuth(withRouter(Dashboard));