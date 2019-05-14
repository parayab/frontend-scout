import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

import SectionView from './sectionView';
import SectionForm from './sectionForm';
import './sections.css';

class SectionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: null,
      newSection: false,
    };
    this.handleSelectedSection = this.handleSelectedSection.bind(this);
    this.newSection = this.newSection.bind(this);
    this.cancelCreateSection = this.cancelCreateSection.bind(this);
  }
  handleSelectedSection(event, data) {
    const { section } = data;
    this.setState({ selectedSection: section});
  }
  newSection() {
    this.setState({ newSection: true, selectedSection: null });
  }
  cancelCreateSection() {
    this.setState( {newSection: false });
  }
  render() {
    if(!this.props.sections.length === 0) {return <div>Loading...</div>}
    return(
      <Fragment>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            direction='left'
            inverted
            vertical
            visible={true}
          >
            <Menu.Item 
              header
              section={null}
              onClick={this.handleSelectedSection}
            >
              Unidades
            </Menu.Item>
            {this.props.sections.map(section =>
              <Menu.Item 
                key={section.id} 
                section={section}
                onClick={this.handleSelectedSection}>
                <Icon name='users'/>
                {section.name}
              </Menu.Item>
            )}
            <Menu.Item />
            <Menu.Item onClick={this.newSection}>
              <Icon name='add'/>
              Agregar unidad
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {!this.state.selectedSection && !this.state.newSection
            && (
            <Segment>
              <Header as='h3'>Administración de unidades</Header>
              <Segment>
                Aquí puedes ver y editar la información de las unidades de tu grupo. 
                Además, puedes agregar participantes.
              </Segment>
            </Segment>
            )}
            {this.state.selectedSection
            && 
            <SectionView 
              section={this.state.selectedSection}
              saveChanges={this.props.saveChanges}
              sectionTypes={this.props.sectionTypes}
              deleteSection={this.props.deleteSection}
            />
            }
            {this.state.newSection
            && (
            <Segment>
              <Header>
                Nueva Unidad
              </Header>
              <SectionForm 
                cancelEdition={this.cancelCreateSection}
                saveChanges={this.props.newSection}
                section={{ name: '', typeId: null }}
                sectionTypes={this.props.sectionTypes}
              />
            </Segment>
            )}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Fragment>
      
    )
  }
}

SectionsComponent.propTypes = {
  sections: PropTypes.array.isRequired,
  sectionTypes: PropTypes.array.isRequired,
  saveChanges: PropTypes.func.isRequired,
  newSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
};

export default SectionsComponent;