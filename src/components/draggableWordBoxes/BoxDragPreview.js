import React, { Component } from "react";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import Box from "./Box";

const styles = {
  display: "inline-block",
  transform: "",
  WebkitTransform: ""
};

export default class BoxDragPreview extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { title } = this.props;

    return (
      <div
        style={{
          ...styles
        }}
      >
        <Box title={title} />
      </div>
    );
  }
}
