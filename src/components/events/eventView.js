import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import MembersList from './membersList';

import {
  List,
  Header,
  Segment,
  Button,
  Icon,
  Confirm
} from "semantic-ui-react";
import EventForm from "./eventForm";

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      confirmDelete: false,
      isFetchingParticipants: false,
      eventMembers: [],
      isFetchingGroupMembers: false,
      groupMembers: [],
    };
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.openConfirmDelete = this.openConfirmDelete.bind(this);
  }
  componentDidMount() {
    this.getAllParticipants();
    this.getAllGroupMembers();
  }
  componentDidUpdate(prevProps) {
    if (this.props.groupEvent.id !== prevProps.groupEvent.id) {
      this.getAllParticipants();
      this.getAllGroupMembers();
    }
  }
  changeEditMode() {
    this.setState((state, props) => {
      return { editMode: !state.editMode };
    });
  }
  openConfirmDelete() {
    this.setState({ confirmDelete: true });
  }
  handleCancelDelete() {
    this.setState({ confirmDelete: false });
  }
  handleConfirmDelete() {
    this.props.deleteGroupEvent(this.props.groupEvent.id);
  }

  async getAllParticipants() {
    this.setState({ isFetchingParticipants: true });
    const groupEventId = this.props.groupEvent.id;
    const response = await fetch(`groups/1/groupevent/${groupEventId}/getusers`);
    if (response.ok) {
      const resJson = await response.json();
      if (resJson.users) {
        this.setState({eventMembers: resJson.users, isFetchingParticipants: false});
        return;
      }
    }
    this.setState({ isFetchingParticipants: false });
  }

  async getAllGroupMembers() {
    this.setState({isFetchingGroupMembers: true});
    const response = await fetch(`groups/1/users`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({isFetchingGroupMembers: false, groupMembers: resJson.users });
      return;
    }
    this.setState({ isFetchingGroupMembers: false });
  }

  render() {
    const { groupEvent, saveChanges } = this.props;
    const { editMode } = this.state;

    const EventInfo = (
      <Fragment>
        <List>
          <List.Item>Nombre: {groupEvent.name}</List.Item>
          <List.Item>Ubicación: {groupEvent.location}</List.Item>
          <List.Item>Fecha: {groupEvent.foundationDate.split('T')[0]}</List.Item>
          <List.Item>Precio: {groupEvent.price}</List.Item>
          <List.Item>Descripción: {groupEvent.description}</List.Item>
        </List>
        <Button onClick={this.changeEditMode}>
          <Icon name="edit" />
          Editar Información
        </Button>
      </Fragment>
    );

    return (
      <Fragment>
        <Confirm
          open={this.state.confirmDelete}
          cancelButton="Cancelar"
          confirmButton="Eliminar"
          content="¿Estás seguro de eliminar el evento?"
          onCancel={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
        <Segment.Group>
          <Segment>
            <Header as="h3">Información del evento</Header>
            {!editMode && EventInfo}
            {editMode && (
              <EventForm
                groupEvent={groupEvent}
                saveChanges={saveChanges}
                cancelEdition={this.changeEditMode}
              />
            )}
          </Segment>
          <Segment>
            {
            <Fragment>
              <MembersList
                loadingMembers={this.state.isFetchingParticipants}
                members={this.state.eventMembers}
                deleteMember={(member)=>console.log(member)}
              />
              <Button onClick={()=>console.log('agregando miembros!')}>
                <Icon name='add user' />
                Agregar participantes
              </Button>
            </Fragment>
            }
          </Segment>
          <Segment>
            <Button basic color="red" onClick={this.openConfirmDelete}>
              Eliminar evento
            </Button>
          </Segment>
        </Segment.Group>
      </Fragment>
    );
  }
}

EventView.propTypes = {
  groupEvent: PropTypes.object.isRequired,
  loadingAssistants: PropTypes.bool.isRequired,
  saveChanges: PropTypes.func.isRequired,
  deleteGroupEvent: PropTypes.func.isRequired
};

export default EventView;
