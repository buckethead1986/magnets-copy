import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

export default class SelectFieldDropdown extends Component {
  state = {
    values: [],
    users: []
  };

  componentWillMount() {
    this.setState({
      users: this.props.users
    });
  }

  handleChange = (event, index, values) => {
    this.setState({ values }, () =>
      this.props.filteredPoems(this.state.values)
    );
  };

  menuItems(values) {
    return this.state.users.map(user => (
      <MenuItem
        key={user.id}
        insetChildren={true}
        checked={values && values.indexOf(user.username) > -1}
        value={user.username}
        primaryText={user.username}
      />
    ));
  }

  render() {
    const { values } = this.state;
    if (this.props.currUser.length !== 0) {
      return (
        <SelectField
          multiple={true}
          hintText="Select poems by user(s)"
          value={values}
          onChange={this.handleChange}
        >
          <MenuItem
            key={0}
            insetChildren={true}
            checked={values && values.indexOf("Favorites") > -1}
            value={"Favorites"}
            primaryText={"Favorites"}
          />
          {this.menuItems(values)}
        </SelectField>
      );
    } else {
      return (
        <SelectField
          multiple={true}
          hintText="Select poems by user(s)"
          value={values}
          onChange={this.handleChange}
        >
          {this.menuItems(values)}
        </SelectField>
      );
    }
  }
}
