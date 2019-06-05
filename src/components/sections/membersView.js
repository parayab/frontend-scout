import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { List, Header, Segment, Button, Icon } from 'semantic-ui-react'
import UserForm from './userForm';

class MembersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: false, 
    }
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleCancelCreateUser = this.handleCancelCreateUser.bind(this);
  }
  handleCreateUser() {
    this.setState({ newMember: true });
  }
  handleCancelCreateUser() {
    this.setState({ newMember: false });
  }
  render() {
    const userFormModal = (
      <UserForm 
        handleCancel={this.handleCancelCreateUser}
        open={this.state.newMember}
        getMembers={this.props.getMembers}
        section={this.props.section}
      />
    )
    const createNewMemberButton = (
    <Button onClick={this.handleCreateUser}>
      <Icon name='add user' />
      Añadir miembro
    </Button>
    );

    if(this.props.loadingMembers) {
      return (
        <Segment>
          <Header as='h3'>Miembros</Header>
          Loading...
        </Segment>
      )
    }
    if (this.props.members.length === 0) {
      return (
      <Fragment>
        { userFormModal }
        <Segment>
          <Header as='h3'>Miembros</Header>
          <Header as='h5'>Aún no hay miembros en esta unidad</Header>
          { createNewMemberButton }
        </Segment>
      </Fragment>
      )
    }
    return(
      <Fragment>
        { userFormModal }
        <Segment>
          <Header as='h3'>Miembros</Header>
          <List celled verticalAlign='middle'>
            {this.props.members.map(member => {
              return (
                <List.Item key={member.id}>
                  <List.Icon name='user' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>{member.name1 + ' ' + member.surname1}</List.Header>
                    <List.Description>{member.email}</List.Description>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
          { createNewMemberButton }
        </Segment>
      </Fragment>

    )
  }
}

MembersView.propTypes = {
  section: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  loadingMembers: PropTypes.bool.isRequired,
  getMembers: PropTypes.func.isRequired,
};

export default MembersView;