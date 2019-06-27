import React, { Component, Fragment } from "react";
import SectionsComponent from "../components/sections/sections";
import withAuth from "../components/auth/withAuth";

class SectionsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      validSectionTypes: [],
      loading: true
    };
    this.editSection = this.editSection.bind(this);
    this.getAllSections = this.getAllSections.bind(this);
    this.getSectionTypes = this.getSectionTypes.bind(this);
    this.newSection = this.newSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getAllSections();
    await this.getSectionTypes();
    this.setState({ loading: false });
    console.log('groupId:', this.props.groupId);
  }

  async getAllSections() {
    const response = await fetch(`/groups/${this.props.groupId}/sections`);
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ sections: resJson.sections });
    }
  }

  async getSectionTypes() {
    const response = await fetch(`/groups/${this.props.groupId}/sections/sectionTypes`);
    if (response.ok) {
      const resJson = await response.json();
      const validSectionTypes = resJson.sectionTypes.map(section => {
        return { key: section.id, text: section.name, value: section.id };
      });
      this.setState({ validSectionTypes });
    }
  }

  async editSection(name, typeId, sectionId) {
    this.setState({ loading: true });
    const response = await fetch(`groups/${this.props.groupId}/sections/${sectionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, typeId: typeId })
    });
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ sections: resJson.sections });
    }
    this.setState({ loading: false });
  }

  async newSection(name, typeId) {
    this.setState({ loading: true });
    const response = await fetch(`groups/${this.props.groupId}/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, typeId: typeId })
    });
    if (response.ok) {
      const resJson = await response.json();
      this.setState({ sections: resJson.sections });
    }
    this.setState({ loading: false });
  }

  async deleteSection(sectionId) {
    this.setState({ loading: true });
    await fetch(`groups/${this.props.groupId}/sections/${sectionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.setState({ loading: false });
    this.getAllSections();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <SectionsComponent
          sections={this.state.sections}
          sectionTypes={this.state.validSectionTypes}
          saveChanges={this.editSection}
          newSection={this.newSection}
          deleteSection={this.deleteSection}
          groupId={this.props.groupId}
        />
      </Fragment>
    );
  }
}

export default withAuth(SectionsView);
