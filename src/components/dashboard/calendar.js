import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar'

import moment from 'moment';
import 'moment/locale/es';

class DashboardCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: {id: null}
    };
    this._onView = this._onView.bind(this);
  }
  _onView(event) {
    console.log(event);
  }
  render() {
    const localizer = momentLocalizer(moment)
    const events = this.props.groupEvents.map(event => {
      return {
        title: event.name,
        start: moment(event.foundationDate).add(1, "day"), end: moment(event.foundationDate).add(1, "day"),
        allDay: true, resource: event.description
      }
    });
    console.log(events);
    return (
      <div style={{height: "550px"}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "agenda"]}
          onView={this._onView}
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
    )
  }
}

DashboardCalendar.propTypes = {
  groupEvents: PropTypes.array.isRequired
};
export default DashboardCalendar;