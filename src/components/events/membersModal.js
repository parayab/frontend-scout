import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Segment, List, Checkbox } from 'semantic-ui-react';


class MembersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingNonAssistants: false,
      nonAssistants: [],
      allSelected: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.addMembers = this.addMembers.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
  }
  async componentDidMount() {
    this.setState({isFetchingNonAssistants: true});
    const response = await fetch(`groups/2/users`);
    if (response.ok) {
      const resJson = await response.json();
      const usersInfo = resJson.users.map(user => {
        return Object.assign({...user}, {selected: false} );
      });
      this.setState({isFetchingNonAssistants: false, nonAssistants: usersInfo });
      return;
    }
    this.setState({ isFetchingNonAssistants: false });
    
  }

  addMembers() {
    // const response = await fetch(`/groups/2/`)
    const list = []
    this.state.nonAssistants.forEach(member => {
      if (!member.selected) {return}
      list.push(fetch(`/groups/2/groupevent/${this.props.groupEventId}/addUser/${member.id}`, {
        method: 'POST',
      }))
    });
    Promise.all(list).then(() => {
      this.props.fetchAllParticipants();
      this.props.handleCancel();
    })
  }

  handleToggle(id) {
    this.setState(prevState => {
      const selected = prevState.nonAssistants.find(member => member.id === id);
      selected.selected = !selected.selected;
      const newNonAssistants = prevState.nonAssistants.map(member => member.id === id ? selected : member);
      return {nonAssistants: newNonAssistants, allSelected: false}
    });
  }
  handleToggleAll() {
    this.setState(prevState => {
      const newNonAssistants = prevState.nonAssistants.map(member => {
        member.selected = !prevState.allSelected;
        return member
      });
      return {nonAssistants: newNonAssistants, allSelected: !prevState.allSelected}
    });
  }

  render() {
    const members = this.state.nonAssistants;
    const modalButtons = (
      <Modal.Actions>
        <Button negative onClick={this.props.handleCancel}>
          Cancelar
        </Button>
        <Button positive onClick={this.addMembers}>
          Guardar
        </Button>
      </Modal.Actions>
    );
    return (
    <Modal
      open={this.props.open}
      onClose={this.props.handleCancel}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Añadir usuario</Modal.Header>
      <Segment basic loading={this.state.isFetchingNonAssistants} disabled={this.state.isFetchingNonAssistants}>
        <Modal.Content>
          <List divided verticalAlign='middle'>
            <List.Item>
              <List.Content floated='right'>
                <Checkbox label='TODOS' onChange={this.handleToggleAll} checked={this.state.allSelected}/>
              </List.Content>
            </List.Item>
            {members.map(member => {
              return (
                <List.Item key={member.id}>
                  <List.Content floated='right'>
                    <Checkbox key={member.id} onChange={() => this.handleToggle(member.id)} checked={member.selected}/>
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
          <br />
        </Modal.Content>
        { modalButtons }
      </Segment>
    </Modal>)
  }
}

MembersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  fetchAllParticipants: PropTypes.func.isRequired,
  groupEventId: PropTypes.number.isRequired
}

export default MembersModal;