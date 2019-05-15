import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { List, Header, Segment } from "semantic-ui-react";

class EventView extends Component {
  render() {
    const { groupEvent } = this.props;

    const EventInfo = (
      <Fragment>
        <List>
          <List.Item>Nombre: {groupEvent.name}</List.Item>
          <List.Item>Ubicación: {groupEvent.location}</List.Item>
          <List.Item>Fecha: {groupEvent.foundationDate}</List.Item>
          <List.Item>Precio: {groupEvent.price}</List.Item>
          <List.Item>Descripción: {groupEvent.description}</List.Item>
        </List>
      </Fragment>
    );

    return (
      <Fragment>
        <Segment.Group>
          <Segment>
            <Header as="h3">Información del evento</Header>
            {EventInfo}
          </Segment>
        </Segment.Group>
      </Fragment>
    );
  }
}

EventView.propTypes = {
  groupEvent: PropTypes.object.isRequired,
  loadingAssistants: PropTypes.bool.isRequired
};

export default EventView;
