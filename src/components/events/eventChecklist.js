import React, { Component } from 'react';
import PropTypes from "prop-types";
import { List, Checkbox, Header, Segment, Button, Form } from 'semantic-ui-react';

class EventChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklist: [],
      addingTask: false,
      isFetching: false,
      newTask: "",
      submittingTask: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.onTaskChange = this.onTaskChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  componentDidMount() {
    this.fetchChecklist();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.groupEventId !== this.props.groupEventId) {
      this.fetchChecklist();
    }
  }

  async fetchChecklist() {
    this.setState({ isFetching: true });
    const { groupEventId, groupId } = this.props;
    const response = await fetch(`groups/${groupId}/groupevent/${groupEventId}/checklist`);
    if (response.ok) {
      const resJson = await response.json();
      if (resJson.checklist) {
        this.setState({ checklist: resJson.checklist, isFetching: false });
        return;
      }
    }
    this.setState({ isFetching: false });
  }

  async handleToggle(taskId) {
    const { groupEventId, groupId } = this.props;
    const response = await fetch(`groups/${groupId}/groupevent/${groupEventId}/checklist/${taskId}/toggle`, {
      method: 'PATCH'
    });
    if (response.ok) {
      this.setState(prevState => {
        const selectedTask = prevState.checklist.find(task => task.id === taskId);
        selectedTask.completed = !selectedTask.completed;
        const newChecklist = prevState.checklist.map(task => task.id === taskId ? selectedTask : task);
        return { checklist: newChecklist }
      });
    }
  }

  toggleTaskForm() {
    this.setState(prevState => { return { addingTask: !prevState.addingTask, submittingTask: false } });
  }

  onTaskChange(event, data) {
    this.setState({ newTask: data.value, submittingTask: false });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ submittingTask: true });
    if (this.state.newTask) {
      const { groupEventId, groupId } = this.props;
      const response = await fetch(`groups/${groupId}/groupevent/${groupEventId}/checklist`, {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.newTask
        })
      });
      if (response.ok) {
        const resJson = await response.json();
        this.setState({ checklist: resJson.checklists, newTask: "", submittingTask: false });
        return;
      }
      this.setState({ newTask: "" });
    }
  }

  async deleteTask(event, data) {
    const { groupEventId, groupId } = this.props;
    const task = data.task;
    const response = await fetch(`groups/${groupId}/groupevent/${groupEventId}/checklist/${task.id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      this.setState(prevState => {
        const array = [...prevState.checklist];
        const indexToDelete = array.indexOf(task);
        array.splice(indexToDelete, 1);
        return { checklist: array }
      })
    }
  }

  render () {
    return (
      <Segment loading={this.state.isFetching}>
        <Header as="h3">Tareas</Header>
        <List divided verticalAlign='middle' style={{overflowY: 'auto', overflowX: 'ellipsis', maxHeight: 200 }}>
          {this.state.checklist.map(task => {
            const fontStyle = task.completed ? "line-through" : "none";
            return (
              <List.Item key={task.id}>
                <List.Content style={{ display: "inline-block" }}>
                  <Checkbox
                    style={{ textDecoration : fontStyle, display: "inline-block" }}
                    label={task.name}
                    key={task.id}
                    onChange={() => this.handleToggle(task.id)}
                    checked={task.completed}
                    readOnly={this.props.readOnly}
                  />
                </List.Content>
                <List.Content style={{ display: "inline-block" }}>
                  <Button
                    floated="right"
                    compact basic size="mini"
                    task={task} onClick={this.deleteTask}>x</Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
        {this.state.addingTask && 
        <Form error onSubmit={this.handleSubmit}>
          <Form.Input
            autoFocus
            fluid
            placeholder='Agregar tarea...' 
            onChange={this.onTaskChange}
            value={this.state.newTask}
            error={!this.state.newTask && this.state.submittingTask }
          />
          <Button.Group>
            <Button type='submit'>Agregar</Button>
            <Button onClick={this.toggleTaskForm}>Cancelar</Button>
          </Button.Group>
        </Form>
        }

        {!this.state.addingTask && 
          <Button onClick={this.toggleTaskForm}>
            Agregar tarea
          </Button>
        }
      </Segment>
    );
  }
}

EventChecklist.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupEventId: PropTypes.number.isRequired,
  readOnly: PropTypes.bool
}

EventChecklist.defaultProps = {
  readOnly: false
}

export default EventChecklist;