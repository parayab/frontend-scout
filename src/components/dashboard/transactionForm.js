import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, Message } from 'semantic-ui-react';

const categories = [
  { value: "Bingo", key: 0, text: "Bingo" },
  { value: "Actividades", key: 1, text: "Actividades" },
  { value: "Materiales", key: 2, text: "Materiales"},
  { value: "Carpas", key: 3, text: "Carpas"},
  { value: "Buses", key: 4, text: "Buses"},
  { value: "Donación", key: 5, text: "Donación"},
  { value: "Mensualidades", key: 6, text: "Mensualidades"},
  { value: "Becas", key: 7, text: "Becas"}
];
const types = [
  { value: false, key: 0, text: "Gasto"},
  { value: true, key: 1, text: "Ingreso"}
];

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      income: "",
      category: "",
      date: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }
  handleChange(event, data) {
    const newState = { error: false };
    newState[data.name] = data.value;
    this.setState(newState);
  }
  handleSaveChanges() {
    const { amount, income, category, date } = this.state;
    if (amount && income !== "" && category && date) {
      this.props.handleSubmit({ amount, income, category, date });
      return;
    }
    this.setState({ error: true });
  }
  render() {
    const modalButtons = (
      <Modal.Actions>
        <Button negative onClick={this.props.handleCancel}>
          Cancelar
        </Button>
        <Button positive onClick={this.handleSaveChanges}>
          Guardar
        </Button>
      </Modal.Actions>
    );
    const transactionForm = (
      <Form error>
        <Form.Group widths='equal'>
          <Form.Input
            type="number"
            name="amount"
            fluid label='Cantidad' 
            placeholder='Cantidad' 
            onChange={this.handleChange}
            value={this.state.amount}
            error={!this.state.amount && this.state.error}
          />
          <Form.Input
            type="date"
            name="date"
            fluid label='Fecha' 
            placeholder='Fecha' 
            onChange={this.handleChange}
            value={this.state.date}
            error={!this.state.date && this.state.error}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Select
            fluid
            name="category"
            label='Categoría'
            options={categories}
            placeholder='Categoría'
            onChange={this.handleChange}
            value={this.state.category}
            error={!this.state.category && this.state.error}
          />
          <Form.Select
            fluid
            name="income"
            label='Tipo'
            options={types}
            placeholder='Tipo'
            onChange={this.handleChange}
            value={this.state.income}
            error={this.state.income==="" && this.state.error}
          />
        </Form.Group>
        {this.state.error 
        && (
          <Message
            error
            header='No has completado todos los campos'
          />
        )}
      </Form>
    );
    return(
      <Fragment>
        {this.props.open && 
        <Modal
          open={this.props.open}
          onClose={this.props.handleCancel}
        >
          <Modal.Header>Agregar gasto/ingreso</Modal.Header>
          <Modal.Content>{transactionForm}</Modal.Content>
          {modalButtons}
        </Modal>}
      </Fragment>
    );
  }
}

TransactionForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default TransactionForm;