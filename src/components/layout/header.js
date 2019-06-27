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
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              name='Logout'
              to={'/logout'}
            />
          </Menu.Menu>
        </Menu>
      </Segment>

    )
  }
}