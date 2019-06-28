import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import withAuth from '../components/auth/withAuth';
import { Header, Grid, Segment, Icon, List } from 'semantic-ui-react';
import moment from 'moment';

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
    await this.getGroupInfo();
    await this.getAllMembers();
    await this.getAllEvents();
    this.setState({ isFetching: false });
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
      return event.foundationDate && moment(event.foundationDate).isAfter(today);
    });
    console.log(pendingEvents);
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
            <Segment>
              Aca va otro componente!
            </Segment>
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