import React, { Component } from 'react';
import PropTypes from "prop-types";
import { List, Checkbox, Header, Segment } from 'semantic-ui-react';

class EventChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklist: [],
      editing: false,
      isFetching: false,
    }
    this.handleToggle = this.handleToggle.bind(this);
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

  render () {
    return (
      <Segment loading={this.state.isFetching}>
        <Header as="h3">Tareas</Header>
        <List divided verticalAlign='middle' style={{overflow: 'auto', maxHeight: 200 }}>
          {this.state.checklist.map(task => {
            const fontStyle = task.completed ? "line-through" : "none";
            return (
              <List.Item key={task.id}>
                <Checkbox
                  style={{textDecoration : fontStyle }}
                  label={task.name}
                  key={task.id}
                  onChange={() => this.handleToggle(task.id)}
                  checked={task.completed}
                  readOnly={this.props.readOnly}
                />
              </List.Item>
            );
          })}
        </List>
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