import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const menuCategories = [
  { title: "Simple", category: 1 },
  { title: "Space", category: 2 }
];

export default class SelectWordsListDropdown extends Component {
  state = {
    values: [],
    words: [],
    groups: []
  };

  componentWillMount() {
    this.setState({
      words: this.props.words,
      groups: this.getGroupAndCategory()
    });
  }

  getGroupAndCategory = () => {
    const groups = this.props.words.map(word => {
      return { group: word.group, category: word.category };
    });
    const duplicatesRemoved = groups.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          t => t.category === thing.category && t.group === thing.group
        )
    );
    return duplicatesRemoved;
  };

  handleChange = (event, index, values) => {
    this.props.store.dispatch({ type: "ADD_ALL_WORDS", payload: {} });
    // console.log(this.state.values, values);
    const words = this.state.words.filter(word => {
      return word.group === values;
    });
    console.log(words);
    this.setState({ values }, () =>
      this.props.filteredWords(this.state.values)
    );
    this.props.store.dispatch({ type: "CHANGE_WORDS_LIST", payload: values });
  };

  menuItems(values) {
    return this.state.groups.map(group => (
      <MenuItem
        key={group.group}
        // insetChildren={true}
        // checked={values && values.indexOf(group.group) > -1}
        value={group.group}
        primaryText={group.category}
      />
    ));
  }

  render() {
    console.log(this.state);
    const { values } = this.state;
    return (
      <SelectField
        multiple={false}
        hintText="Select word lists"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(values)}
      </SelectField>
    );
  }
}
