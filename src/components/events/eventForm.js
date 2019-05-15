import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Button, Input, Form, Select } from "semantic-ui-react";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      location: null,
      foundationDate: null,
      description: null,
      price: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }
  componentDidMount() {
    const { groupEvent } = this.props;
    const { name, location, foundationDate, description, price } = groupEvent;
    this.setState({ name, location, foundationDate, description, price });
  }

  saveChanges() {
    const { name, location, foundationDate, description, price } = this.state;
    const { groupEvent } = this.props;
    console.log("WENAAA", groupEvent);
    if (
      !name ||
      !location ||
      !foundationDate ||
      !description ||
      price === null
    ) {
      alert("No puedes dejar campos vacíos");
      return;
    }
    this.props.saveChanges(
      name,
      location,
      foundationDate,
      description,
      price,
      groupEvent.id
    );
  }
  handleNameChange(event, data) {
    this.setState({ name: data.value });
  }
  handleLocationChange(event, data) {
    this.setState({ location: data.value });
  }
  handleDateChange(event, data) {
    this.setState({ foundationDate: data.value });
  }
  handleDescriptionChange(event, data) {
    this.setState({ description: data.value });
  }
  handlePriceChange(event, data) {
    this.setState({ price: data.value });
  }
  render() {
    const { name, location, foundationDate, description, price } = this.state;
    return (
      <Fragment>
        <Form>
          <Form.Field>
            <label>Nombre:</label>
            <Input
              placeholder="Nombre del evento"
              onChange={this.handleNameChange}
              value={name}
            />
          </Form.Field>
          <Form.Field>
            <label>Ubicación:</label>
            <Input
              placeholder="Ubicación"
              onChange={this.handleLocationChange}
              value={location}
            />
          </Form.Field>
          <Form.Field>
            <label>Fecha:</label>
            <Input
              placeholder="Fecha"
              onChange={this.handleDateChange}
              value={foundationDate}
              type="date"
            />
          </Form.Field>
          <Form.Field>
            <label>Precio:</label>
            <Input
              placeholder="Precio"
              onChange={this.handlePriceChange}
              value={price}
            />
          </Form.Field>
          <Form.Field>
            <label>Descripción:</label>
            <Input
              placeholder="Descripción"
              onChange={this.handleDescriptionChange}
              value={description}
            />
          </Form.Field>
          <Button onClick={this.saveChanges}>Guardar</Button>
          <Button onClick={this.props.cancelEdition}>Cancelar</Button>
        </Form>
      </Fragment>
    );
  }
}

EventForm.propTypes = {
  cancelEdition: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  groupEvent: PropTypes.object.isRequired
};

export default EventForm;
