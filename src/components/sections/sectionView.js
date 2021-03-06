import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Icon, List, Header, Button, Segment, Confirm } from 'semantic-ui-react'

import SectionForm from './sectionForm';
import MembersView from './membersView';

class SectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      confirmDelete: false,
    };
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.openConfirmDelete = this.openConfirmDelete.bind(this);
  }
  changeEditMode() {
    this.setState((state, props) => {
      return {editMode: !state.editMode};
    });
  }
  openConfirmDelete() {
    this.setState({ confirmDelete: true });
  }
  handleCancelDelete() {
    this.setState({ confirmDelete: false });
  }
  handleConfirmDelete() {
    this.props.deleteSection(this.props.section.id);
  }
  
  render() {
    const { section, sectionTypes } = this.props;
    const editMode = this.state.editMode;
    const sectionType = sectionTypes.find((element) => element.key === section.typeId);
    const typeDisplay = sectionType ? sectionType.text : 'No info';

    const sectionInfo = (
      <Fragment>
        <List>
          <List.Item>
            Name: {section.name}
          </List.Item>
          <List.Item>
            Tipo: {typeDisplay}
          </List.Item>
        </List>
        <Button onClick={this.changeEditMode}>
          <Icon name='edit'/>
          Editar Información
        </Button>
      </Fragment>
    );

    return(
      <div>
        <Confirm
          open={this.state.confirmDelete}
          cancelButton='Cancelar'
          confirmButton='Eliminar'
          content='¿Estás seguro de eliminar la unidad?'
          onCancel={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
        <Segment.Group>
          <Segment>
            <Header as='h3'>
              Información de la unidad
            </Header>
            {!editMode && sectionInfo}
            {editMode && 
            <SectionForm 
              cancelEdition={this.changeEditMode}
              saveChanges={this.props.saveChanges}
              section={this.props.section}
              sectionTypes={this.props.sectionTypes}
            />}
          </Segment>
          <MembersView
            section={this.props.section}
            members={this.props.members}
            loadingMembers={this.props.loadingMembers}
            getMembers={this.props.getMembers}
            deleteMember={this.props.deleteMember}
            groupId={this.props.groupId}
          />
          <Segment>
            <Button basic color='red' onClick={this.openConfirmDelete}>
              Eliminar unidad
            </Button>
          </Segment>
        </Segment.Group>

      </div>

    )
  }
}

SectionView.propTypes = {
  section: PropTypes.object.isRequired,
  sectionTypes: PropTypes.array.isRequired,
  saveChanges: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  loadingMembers: PropTypes.bool.isRequired,
  getMembers: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default SectionView;