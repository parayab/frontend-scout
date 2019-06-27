import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { Menu, Segment } from 'semantic-ui-react'


class Header extends Component {

  render() {
    const hideItemsFor = ["/login", "/logout"];
    return (
      <Segment inverted attached>
        {/* Aquí debería ir el logo :D */}
        <Menu inverted attached>
          {hideItemsFor.indexOf(this.props.location.pathname) === -1 &&
          (<Fragment>
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
          </Fragment>
          )
          }
        </Menu>
      </Segment>

    )
  }
}

export default withRouter(Header)