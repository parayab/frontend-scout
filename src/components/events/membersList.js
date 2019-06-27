import React, { Fragment } from 'react';
import { List, Header, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const MembersList = (props) => {
  const {loadingMembers, members } = props;
  
  if(loadingMembers) {
    return (
      <Fragment>
        <Header as='h3'>Asistentes</Header>
        Loading...
      </Fragment>
    )
  }
  if (props.members.length === 0) {
    return (
    <Fragment>
      <Header as='h3'>Asistentes</Header>
      <Header as='h5'>Aún no hay asistentes en este evento</Header>
    </Fragment>
    )
  }

  return (
    <Fragment>
      <Header as='h3'>Asistentes</Header>
        <List divided verticalAlign='middle' style={{overflow: 'auto', maxHeight: 200 }}>
          {members.map(member => {
            return (
              <List.Item key={member.id}>
                <List.Content floated='right'>
                  <Button basic color='red' onClick={() => props.deleteMember(member)}>
                    Eliminar
                  </Button>
                </List.Content>
                <List.Icon name='user' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>{member.name1 + ' ' + member.surname1}</List.Header>
                  <List.Description>{member.email}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
    </Fragment>
  );
}

MembersList.propTypes = {
  members: PropTypes.array.isRequired,
  loadingMembers: PropTypes.bool.isRequired,
  deleteMember: PropTypes.func.isRequired,
};

export default MembersList;