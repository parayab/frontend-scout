import React, { Component, Fragment } from "react";
import {
  Header,
  SidebarPushable,
  Sidebar,
  Menu,
  Icon,
  Segment
} from "semantic-ui-react";

import EventView from "../components/events/eventView";
import EventForm from "../components/events/eventForm";

class EventsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupEvents: [],
      loadingGroupEvents: true,
      groupId: 1,
      selectedGroupEvent: null,
      selectedGroupEventAssistants: [],
      loadingSelectedGroupEventAssistants: false,
      creatingGroupEvent: false
    };
    this.getAllGroupEvents = this.getAllGroupEvents.bind(this);
    this.handleGroupEventSelection = this.handleGroupEventSelection.bind(this);
    this.newGroupEvent = this.newGroupEvent.bind(this);
    this.createGroupEvent = this.createGroupEvent.bind(this);
    this.cancelCreateGroupEvent = this.cancelCreateGroupEvent.bind(this);
    this.editGroupEvent = this.editGroupEvent.bind(this);
    this.deleteGroupEvent = this.deleteGroupEvent.bind(this);
  }

  async getAllGroupEvents() {
    const response = await fetch("/groups/1/groupevent");
    if (response.ok) {
      const jsonResponse = await response.json();
      this.setState({
        groupEvents: jsonResponse.groupEvents,
        loadingGroupEvents: false
      });
    }
  }

  handleGroupEventSelection(event, data) {
    // groupEvent is always going to be an object
    const { groupEvent } = data;
    this.setState({
      selectedGroupEvent: groupEvent,
      creatingGroupEvent: false,
      loadingSelectedGroupEventAssistants: true
    });
    //await getSelectedGroupEventAssistants()
  }

  newGroupEvent() {
    this.setState({
      creatingGroupEvent: true,
      selectedGroupEvent: null,
      selectedGroupEventAssistants: [],
      loadingSelectedGroupEventAssistants: false
    });
  }

  async editGroupEvent(
    name,
    location,
    foundationDate,
    description,
    price,
    groupEventId
  ) {
    this.setState({ loadingGroupEvents: true });
    const response = await fetch(`groups/1/groupevent/${groupEventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        location: location,
        foundationDate: foundationDate,
        description: description,
        price: price
      })
    });
    if (response.ok) {
      //const resJson = await response.json();
      await this.getAllGroupEvents();
      return;
    }
    this.setState({ loadingGroupEvents: false });
  }

  async createGroupEvent(name, location, foundationDate, description, price) {
    this.setState({ loadingGroupEvents: true });
    const response = await fetch(`groups/1/groupevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        location: location,
        foundationDate: foundationDate,
        description: description,
        price: price
      })
    });
    if (response.ok) {
      //const resJson = await response.json();
      await this.getAllGroupEvents();
      this.setState({
        creatingGroupEvent: false
      });
      return;
    }
    this.setState({ loadingGroupEvents: false, creatingGroupEvent: false });
  }

  async deleteGroupEvent(groupEventId) {
    this.setState({ loadingGroupEvents: true });
    await fetch(`groups/1/groupevent/${groupEventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.setState({ loadingGroupEvents: false });
    this.getAllGroupEvents();
  }

  cancelCreateGroupEvent() {
    this.setState({ creatingGroupEvent: false });
  }

  componentDidMount() {
    this.getAllGroupEvents();
  }

  render() {
    const {
      loadingGroupEvents,
      groupEvents,
      selectedGroupEvent,
      creatingGroupEvent,
      loadingSelectedGroupEventAssistants
    } = this.state;
    const welcomeText = !selectedGroupEvent && !creatingGroupEvent;
    if (loadingGroupEvents) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <SidebarPushable>
          <Sidebar visible={true} as={Menu} vertical inverted>
            <Menu.Item header event={null}>
              Eventos
              <Icon name="plus" onClick={this.newGroupEvent} link={true} />
            </Menu.Item>
            {groupEvents.map(event => (
              <Menu.Item
                key={event.id}
                groupEvent={event}
                onClick={this.handleGroupEventSelection}
              >
                <Icon name="calendar outline" />
                {event.name}
              </Menu.Item>
            ))}
          </Sidebar>
          <Sidebar.Pusher>
            {/* possible states: welcome text, show groupEvent, new group Event */}
            {welcomeText && (
              <Segment>
                <Header as="h3">Administración de eventos de grupo</Header>
                <Segment>
                  En esta sección puedes ver, agregar, eliminar y editar todos
                  los eventos del grupo.
                </Segment>
              </Segment>
            )}
            {selectedGroupEvent && (
              <EventView
                groupEvent={selectedGroupEvent}
                loadingAssistants={loadingSelectedGroupEventAssistants}
                saveChanges={this.editGroupEvent}
                deleteGroupEvent={this.deleteGroupEvent}
              />
            )}
            {creatingGroupEvent && (
              <Segment>
                <Header as="h3">Nuevo evento de grupo</Header>
                <EventForm
                  groupEvent={{
                    name: null,
                    location: null,
                    foundationDate: null,
                    description: null
                  }}
                  saveChanges={this.createGroupEvent}
                  cancelEdition={this.cancelCreateGroupEvent}
                />
              </Segment>
            )}
          </Sidebar.Pusher>
        </SidebarPushable>
      </Fragment>
    );
  }
}

export default EventsView;
