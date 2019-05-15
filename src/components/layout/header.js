import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { Menu, Segment } from 'semantic-ui-react'


export default class Header extends Component {

  render() {
    return (
      <Segment inverted attached>
        {/* Aquí debería ir el logo :D */}
        <Menu inverted attached>
          <Menu.Item 
            name='Unidades' 
            as={Link}
            to={'/sections'}
          />
          <Menu.Item
            name='Eventos'
            as={Link}
            to={'/events'}
          />
        </Menu>
      </Segment>

    )
  }
}