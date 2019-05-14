import React, { Component, Fragment } from 'react';
import Layout from '../components/layout/layout';

class EventsView extends Component {
  constructor(props) {
	super(props);
	this.state = {
    events: [],
    loading: false
	}
  }
  
	componentDidMount() {
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
    this.setState({ events: [{id:1, name: "Evento del año"}, {id: 2, name: "Evento no tan weno"}] })
  }
  
	render() {
    if(this.state.loading) {
      return (<div>Loading...</div>)
    }
    return (
      <Fragment>
        <Layout>
          <h1>Eventos</h1>
          <ul>
            {this.state.events.map(event => 
              <li key={event.id}>{event.name}</li>
            )}
          </ul>
        </Layout>
      </Fragment>
    )
    
	}
}

export default EventsView;