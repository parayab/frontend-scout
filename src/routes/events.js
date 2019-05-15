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
              />
            )}
            {creatingGroupEvent && <Segment>Mostrar Form</Segment>}
          </Sidebar.Pusher>
        </SidebarPushable>
      </Fragment>
    );
  }
}

export default EventsView;
