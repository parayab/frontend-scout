/* eslint-disable no-useless-escape */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MOCK_DATA from './MOCK_DATA';

import { Modal, Button, Confirm, Form, Message, Segment } from 'semantic-ui-react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCancelOpen: false,
      roles: MOCK_DATA.ROLES_ID,
      name1: '',
      name2: '',
      surname1: '',
      surname2: '',
      email: '',
      birthdate: '',
      address: '',
      roleId: null,
      sectionId: null,
      error: false,
      emailError: false,
      loading: false,
      requestMethod: '',
    }
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleBackToForm = this.handleBackToForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleSecondNameChange = this.handleSecondNameChange.bind(this);
    this.handleFirstSurnameChange = this.handleFirstSurnameChange.bind(this);
    this.handleSecondSurnameChange = this.handleSecondSurnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  componentDidMount() {
    if (this.props.selectedMember !== undefined) {
      this.setState({...this.props.selectedMember});
      this.setState({
        birthdate: this.props.selectedMember.birthdate.split('T')[0],
        requestMethod: 'PATCH',
      });
    } else this.setState({ requestMethod: 'POST' });
  }
  resetState() {
    this.setState({
      confirmCancelOpen: false,
      roles: MOCK_DATA.ROLES_ID,
      name1: '',
      name2: '',
      surname1: '',
      surname2: '',
      email: '',
      birthdate: '',
      address: '',
      roleId: null,
      sectionId: null,
      error: false,
      emailError: false,
      loading: false,
    });
  }
  handleOnClose() {
    this.setState({ confirmCancelOpen: true });
  }
  handleBackToForm() {
    this.setState({ confirmCancelOpen: false });
  }
  handleCancel() {
    this.setState({ confirmCancelOpen: false });
    this.resetState();
    this.props.handleCancel();
  }
  async handleSaveChanges() {
    this.setState({ error: false, emailError: false });
    const isValid = this.formValidation();
    if (!isValid) {
      return;
    }
    const {
      name1,
      name2,
      surname1,
      surname2,
      email,
      birthdate,
      address,
      roleId,
      requestMethod
    } = this.state;
    const userId = this.props.selectedMember ? this.props.selectedMember.id : '';
    this.setState({loading: true});
    const response = await fetch(`/groups/${this.props.groupId}/sections/${this.props.section.id}/users/${userId}`, {
      method: requestMethod,
      body: JSON.stringify({
        name1,
        name2,
        surname1,
        surname2,
        email,
        birthdate,
        address,
        roleId
      })
    });
    this.setState({ loading: false });
    if (response.ok) {
      const alertMessage = this.props.selectedMember ? 'Cambios guardados con éxito' : 'Usuario creado con éxito';
      alert(alertMessage);
      this.props.getMembers(this.props.section);
      this.resetState();
      this.props.handleCancel();
      return;
    }
    const failureMessage = !this.props.selectedMember ? 'Hubo un error guardando los cambios' : 'Hubo un error creando al usuario.';
    alert(failureMessage + ' Intenta nuevamente');
  }
  handleFirstNameChange(event, data) {
    this.setState({ name1: data.value });
  }
  handleSecondNameChange(event, data) {
    this.setState({ name2: data.value });
  }
  handleFirstSurnameChange(event, data) {
    this.setState({ surname1: data.value });
  }
  handleSecondSurnameChange(event, data) {
    this.setState({ surname2: data.value });
  }
  handleEmailChange(event, data) {
    this.setState({ email: data.value, emailError: false });
  }
  handleBirthdateChange(event, data) {
    this.setState({ birthdate: data.value });
  }
  handleAddressChange(event, data) {
    this.setState({ address: data.value });
  }
  handleRoleChange(event, data) {
    this.setState({ roleId: data.value });
  }
  formValidation() {
    const {
      name1,
      surname1,
      email,
      birthdate,
      address,
      roleId
    } = this.state;
    const matchEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
    this.setState({ emailError: !matchEmail });
    
    if (!name1 || !surname1 || !email || !birthdate || !address || !roleId) {
      this.setState({ error: true });
      return false;
    }
    if (!matchEmail) {
      return false;
    }
    return true;
  }

  render() {
    const confirmCloseModal = (
      <Confirm
        open={this.state.confirmCancelOpen}
        cancelButton='Cancelar'
        confirmButton='Volver al formulario'
        content='Si cancelas la creación perderás todos los datos ¿Estás seguro de cancelar?'
        onCancel={this.handleCancel}
        onConfirm={this.handleBackToForm}
      />
    );
    const modalButtons = (
      <Modal.Actions>
        <Button negative onClick={this.handleOnClose}>
          Cancelar
        </Button>
        <Button positive onClick={this.handleSaveChanges}>
          Guardar
        </Button>
      </Modal.Actions>
    );
    const mock_options = this.state.roles.map(role => {
      return { key: role.id, text: role.name, value: role.id }
    })

    const userForm = (
      <Form error>
        <Form.Group widths='equal'>
          <Form.Input 
            fluid label='Nombre (*)' 
            placeholder='Nombre' 
            onChange={this.handleFirstNameChange}
            value={this.state.name1}
            error={!this.state.name1 && this.state.error}
          />
          <Form.Input 
            fluid
            label='Segundo Nombre'
            placeholder='Segundo nombre'
            onChange={this.handleSecondNameChange}
            value={this.state.name2}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Apellido (*)'
            placeholder='Apellido'
            onChange={this.handleFirstSurnameChange}
            value={this.state.surname1}
            error={!this.state.surname1 && this.state.error}
          />
          <Form.Input
            fluid
            label='Segundo apellido'
            placeholder='Segundo apellido'
            onChange={this.handleSecondSurnameChange}
            value={this.state.surname2}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Email (*)'
            placeholder='Email'
            type='email'
            onChange={this.handleEmailChange}
            value={this.state.email}
            error={this.state.emailError || (!this.state.email && this.state.error)}
          />
          <Form.Input
            fluid
            label='Fecha de nacimiento (*)'
            placeholder='Fecha de nacimiento'
            type='date'
            onChange={this.handleBirthdateChange}
            value={this.state.birthdate}
            error={!this.state.birthdate && this.state.error}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Select
            fluid
            label='Rol (*)'
            options={mock_options}
            placeholder='Rol'
            onChange={this.handleRoleChange}
            value={this.state.roleId}
            error={!this.state.roleId && this.state.error}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Dirección (*)'
            placeholder='Dirección'
            onChange={this.handleAddressChange}
            value={this.state.address}
            error={!this.state.address && this.state.error}
          />
        </Form.Group>
        {this.state.error 
        && (
        <Fragment>
          <Message
            error
            header='No has completado todos los campos'
            content='Debes completar todos los campos marcados con un asterisco (*)'
          />
          <br />
        </Fragment>
        )}
      </Form>
    );

    return(
      <Fragment>
        {confirmCloseModal}
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <Modal.Header>Añadir usuario</Modal.Header>
          <Segment basic loading={this.state.loading} disabled={this.state.loading}> 
            <Modal.Content>
              { userForm }
            </Modal.Content>
            { modalButtons }
          </Segment>
        </Modal>
      </Fragment>
      
    )
  }
}

UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  selectedMember: PropTypes.object,
  groupId: PropTypes.string.isRequired,
}

export default UserForm;