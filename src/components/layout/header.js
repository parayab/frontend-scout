import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { Menu, Segment } from 'semantic-ui-react'


class Header extends Component {

  render() {
    const hideItemsFor = ["/login", "/logout"];
    const showMenuItems = hideItemsFor.indexOf(this.props.location.pathname) === -1;
    return (
      <Segment inverted attached>
        <Menu inverted attached>
          <Menu.Item
            as={Link}
            to={'/'}
          >
            <img src="\favicon.png" alt="logo" />
          </Menu.Item>
          {showMenuItems &&
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
            <Menu.Item
              name='Dashboard'
              as={Link}
              to={'/dashboard'}
            />
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              name='Logout'
              to={'/logout'}
            />
          </Menu.Menu>
          </Fragment>
          )}
          {!showMenuItems && (
            <Menu.Menu position='right'>
              <Menu.Item
                name='Login'
              />
            </Menu.Menu>
          )}

        </Menu>
      </Segment>

    )
  }
}

export default withRouter(Header)