import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";

const styles = {
  border: "1px solid black",
  borderRadius: "4px",
  padding: "0.3rem 0.3rem",
  cursor: "move",
  fontSize: 18,
  backgroundColor: "white"
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
    const { title } = this.props;

    return (
      <div ref="target" id={this.props.id} style={styles}>
        {title}
      </div>
    );
  }
}
