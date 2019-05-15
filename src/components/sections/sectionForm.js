import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button, Input, Form, Select } from 'semantic-ui-react'

class SectionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: null,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }
  componentDidMount() {
    this.setState({ name: this.props.section.name, type: this.props.section.typeId})
  }

  saveChanges() {
    if( !this.state.name || !this.state.type ) {
      alert('No puedes dejar campos vacíos');
      return;
    }
    this.props.saveChanges(this.state.name, this.state.type, this.props.section.id);
  }
  handleNameChange(event, data) {
    this.setState({ name: data.value });
  } 
  handleTypeChange(event, data) {
    this.setState({ type: data.value })
  }
  render() {
    return(
      <Fragment>
        <Form>
          <Form.Field>
            <label>Nombre:</label>
            <Input placeholder='Nombre de la unidad' 
              onChange={this.handleNameChange} 
              value={this.state.name}/>
          </Form.Field>
          <Form.Field>
            <label>Tipo:</label>
            <Select 
              placeholder='Tipo de unidad' 
              options={this.props.sectionTypes}
              value={this.state.type}
              onChange={this.handleTypeChange}
            />
          </Form.Field>
          <Button onClick={this.saveChanges}>
            Guardar
          </Button>
          <Button onClick={this.props.cancelEdition}>
            Cancelar
          </Button>
        </Form>
      </Fragment>
    );
  }
}

SectionForm.propTypes = {
  cancelEdition: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  sectionTypes: PropTypes.array.isRequired,
}

export default SectionForm;