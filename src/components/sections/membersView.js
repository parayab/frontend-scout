import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { List, Header, Segment, Button, Icon, Confirm } from 'semantic-ui-react'
import UserForm from './userForm';

class MembersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFormOpen: false, 
      confirmDeleteOpen: false,
      selectedMember: undefined,
    }
    this.handleOpenUserForm = this.handleOpenUserForm.bind(this);
    this.handleCancelCreateUser = this.handleCancelCreateUser.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete= this.handleConfirmDelete.bind(this);
    this.openConfirmDelete = this.openConfirmDelete.bind(this);
  }
  handleOpenUserForm(user) {
    this.setState({ userFormOpen: true, selectedMember: user });
  }
  handleCancelCreateUser() {
    this.setState({ userFormOpen: false });
  }
  handleCancelDelete() {
    this.setState({ confirmDeleteOpen: false, selectedMember: undefined });
  }
  async handleConfirmDelete() {
    await this.props.deleteMember(this.props.section.id, this.state.selectedMember.id);
    this.handleCancelDelete();
  }
  openConfirmDelete(member) {
    this.setState({ confirmDeleteOpen: true, selectedMember: member });
  }
  render() {
    const userFormModal = (
      <UserForm 
        handleCancel={this.handleCancelCreateUser}
        open={this.state.userFormOpen}
        getMembers={this.props.getMembers}
        section={this.props.section}
        selectedMember={this.state.selectedMember}
        groupId={this.props.groupId}
      />
    )
    const createuserFormOpenButton = (
    <Button onClick={() => this.handleOpenUserForm(undefined)}>
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
          { createuserFormOpenButton }
        </Segment>
      </Fragment>
      )
    }
    const confirmDelete = (
      <Confirm
        open={this.state.confirmDeleteOpen}
        cancelButton='Cancelar'
        confirmButton='Eliminar'
        content='¿Estás seguro de eliminar al usuario?'
        onCancel={this.handleCancelDelete}
        onConfirm={this.handleConfirmDelete}
      />
    );
    return(
      <Fragment>
        { this.state.userFormOpen && userFormModal }
        { confirmDelete }
        <Segment>
          <Header as='h3'>Miembros</Header>
          <List divided verticalAlign='middle'>
            {this.props.members.map(member => {
              return (
                <List.Item key={member.id}>
                  <List.Content floated='right'>
                    <Button onClick={() => this.handleOpenUserForm(member)}>
                      Editar
                    </Button>
                    <Button basic color='red' onClick={() => this.openConfirmDelete(member)}>
                      Eliminar
                    </Button>
                  </List.Content>
                  <List.Icon name='user' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>{member.name1 + ' ' + member.surname1}</List.Header>
                    <List.Description>{member.email}</List.Description>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
          { createuserFormOpenButton }
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
  deleteMember: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default MembersView;