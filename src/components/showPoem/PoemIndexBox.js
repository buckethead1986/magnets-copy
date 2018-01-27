import React, { Component } from "react";

const styles = {
  border: "1px dashed black",
  padding: "0.2rem 0.2rem",
  cursor: "move",
  position: "absolute",
  fontSize: 10
};

export default class Box extends Component {
  render() {
    const width = this.props.width / 500;
    const height = this.props.height / 398;
    const { title, top, left } = this.props;
    return (
      <div
        style={{
          ...styles,
          top: parseInt(top) * height,
          left: parseInt(left) * width
        }}
      >
        {title}
      </div>
    );
  }
}
