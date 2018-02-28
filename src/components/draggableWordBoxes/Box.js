import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";

const styles = {
  border: "1px dashed black",
  padding: "0.3rem 0.3rem",
  cursor: "move"
};

export default class Box extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    yellow: PropTypes.bool
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    const el1 = ReactDOM.findDOMNode(this.refs.target);
    if (this.props.store !== undefined) {
      this.props.updateWordsWithWidthAndHeight(el1);
    }
  }

  render() {
    const { title, yellow } = this.props;
    const backgroundColor = yellow ? "yellow" : "white";

    return (
      <div
        ref="target"
        id={this.props.id}
        style={{ ...styles, backgroundColor }}
      >
        {title}
      </div>
    );
  }
}
