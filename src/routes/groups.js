import React, { Component } from "react";
import withAuth from "../components/auth/withAuth";

function List(props) {
  const listItems = props.groups.map(item => <li key={item.id}>{item.name}</li>);
  return <ul>{listItems}</ul>;
}

class AdminGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      isLoaded: false
    };
  }

  async componentDidMount() {
    const res = await fetch("/groups");
    const resJson = await res.json();
    this.setState({ groups: resJson.groups, isLoaded: true });
  }

  render() {
    const { groups, isLoaded } = this.state;
    if (isLoaded) {
      return <List groups={groups} />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default withAuth(AdminGroups);