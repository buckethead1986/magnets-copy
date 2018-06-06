import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

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

  //populates state with group and category of selectable lists of words (e.g. '5, Science')
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

  //changes state and store based on currently selected word group
  //the ADD_ALL_WORDS dispatch maintains proper spacing between draggable word boxes on word group switch
  handleChange = (event, index, values) => {
    this.props.store.dispatch({ type: "ADD_ALL_WORDS", payload: {} });
    this.setState({ values }, () =>
      this.props.filteredWords(this.state.values)
    );
    this.props.store.dispatch({ type: "CHANGE_WORDS_LIST", payload: values });
  };

  //possible dropdown selections
  menuItems(values) {
    return this.state.groups.map(group => (
      <MenuItem
        key={group.group}
        value={group.group}
        primaryText={group.category}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <SelectField
        multiple={false}
        hintText="Select word list"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(values)}
      </SelectField>
    );
  }
}
