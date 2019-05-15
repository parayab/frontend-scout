import React, { Component, Fragment } from "react";
import { SidebarPushable, Sidebar, Menu, Icon } from "semantic-ui-react";

class EventsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupEvents: [],
      loadingGroupEvents: true,
      groupId: 1
    };
    this.getAllGroupEvents = this.getAllGroupEvents.bind(this);
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

  componentDidMount() {
    this.getAllGroupEvents();

    // this.setState({ loading: true });
    // 	fetch('/groups/1/events').then(response => {
    //   if(response.ok) {
    //     return (response.json())
    //   }
    //   return null
    // })
    // .then(resJson => {
    //   if(resJson) {
    //     this.setState({sections: resJson.sections, loading: false})
    //   } else {
    //     this.setState({ loading:false })
    //   }
    // });
  }

  render() {
    const { loadingGroupEvents, groupEvents } = this.state;
    if (loadingGroupEvents) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <SidebarPushable>
          <Sidebar visible={true} as={Menu} vertical inverted>
            <Menu.Item header event={null}>
              Eventos
              <Icon
                name="plus"
                onClick={() => console.log("manejar agregar")}
                link={true}
              />
            </Menu.Item>
            {groupEvents.map(event => (
              <Menu.Item key={event.id} event={event} onClick={() => {}}>
                <Icon name="calendar outline" />
                {event.name}
              </Menu.Item>
            ))}
          </Sidebar>
        </SidebarPushable>
      </Fragment>
    );
  }
}

export default EventsView;
