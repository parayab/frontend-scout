/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';


export default class Home extends Component {

  render() {
    return(
      <Segment placeholder>
        <Header>Administración de grupos scout!</Header>
        <p>
          La mejor herramienta para administrar tu grupo &#128540;
        </p>
      </Segment>
    );
  }
}