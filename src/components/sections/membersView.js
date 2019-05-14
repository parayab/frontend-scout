import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Header, Segment } from 'semantic-ui-react'

class MembersView extends Component {
  
  render() {
    if(this.props.loadingMembers) {
      return (
        <Segment>
          <Header as='h3'>Miembros</Header>
          Loading...
        </Segment>
      )
    }
    if (this.props.members.length === 0) {
      return (
      <Segment>
        <Header as='h3'>Miembros</Header>
        Aún no hay miembros en esta unidad
      </Segment>
      )
    }
    return(
      <Segment>
        <Header as='h3'>Miembros</Header>
        <List>
          {this.props.members.map(member => {
            return (
              <List.Item key={member.id}>
                {member.name1}
              </List.Item>
            )
          })}
        </List>

      </Segment>
    )
  }
}

MembersView.propTypes = {
  section: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  loadingMembers: PropTypes.bool.isRequired,
};

export default MembersView;