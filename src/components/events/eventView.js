import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

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
      confirmDelete: false
    };
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.openConfirmDelete = this.openConfirmDelete.bind(this);
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
  render() {
    const { groupEvent, saveChanges } = this.props;
    const { editMode } = this.state;

    const EventInfo = (
      <Fragment>
        <List>
          <List.Item>Nombre: {groupEvent.name}</List.Item>
          <List.Item>Ubicación: {groupEvent.location}</List.Item>
          <List.Item>Fecha: {groupEvent.foundationDate}</List.Item>
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
