import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar'

import moment from 'moment';
import 'moment/locale/es';
import { Modal, List, Icon } from 'semantic-ui-react';

/*Todos los moment().add(1, "day") es porque no estamos guardando hora, entonces las fechas se guardan con hora
00:00:00 y eso moment lo interpreta como el fin del día anterior :c */ 

class DashboardCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: {id: null}
    };
    this._onView = this._onView.bind(this);
    this._unSelect = this._unSelect.bind(this);
  }
  _onView(event) {
    this.setState({ selectedEvent: event.resource });
  }
  _unSelect() {
    this.setState({ selectedEvent: { id: null } });
  }
  render() {
    const localizer = momentLocalizer(moment)
    const events = this.props.groupEvents.map(event => {
      return {
        title: event.name,
        start: moment(event.foundationDate).add(1, "day"), end: moment(event.foundationDate).add(1, "day"),
        allDay: true, resource: event
      }
    });
    const selectedEvent = this.state.selectedEvent;
    return (
      <Fragment>
        {!!this.state.selectedEvent.id &&
        <Modal
          open={!!this.state.selectedEvent.id}
          onClose={this._unSelect}
          closeIcon
        >
          <Modal.Header>{selectedEvent.name}</Modal.Header>
          <Modal.Content>
            <List>
              <List.Item>
                <Icon name="calendar" />
                Fecha: {moment(selectedEvent.foundationDate).add(1, "day").format('LL')}
              </List.Item>
              <List.Item>
                <Icon name="question circle" />
                Descripción: {selectedEvent.description}
              </List.Item>
              <List.Item>
                <Icon name="point" />
                Ubicación: {selectedEvent.location}
              </List.Item>
              <List.Item>
                <Icon name="dollar" />
                Precio: {selectedEvent.price !== 0 ? selectedEvent.price : `gratis`}
              </List.Item>
            </List>
          </Modal.Content>
        </Modal>
        }
        <div style={{height: "38em"}}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["month", "week", "agenda"]}
            onSelectEvent={this._onView}
            messages={{
              today: "Hoy",
              next: "Próximo",
              previous: "Anterior",
              month: "Mes",
              week: "Semana",
              allDay: "Todo el día",
              date: "Fecha",
              time: "Hora",
              event: "Evento"
            }}
          />
        </div>
      </Fragment>
    )
  }
}

DashboardCalendar.propTypes = {
  groupEvents: PropTypes.array.isRequired
};
export default DashboardCalendar;