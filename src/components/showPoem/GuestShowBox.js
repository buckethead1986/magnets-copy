import React, { Component } from "react";

//shown poem word box
const styles = {
  border: "1px solid black",
  borderRadius: "4px",
  padding: "0.3rem 0.3rem",
  cursor: "move",
  position: "absolute",
  backgroundColor: "white"
};

export default class Box extends Component {
  render() {
    const { title, top, left, zIndex } = this.props;
    return (
      <div
        style={{
          ...styles,
          top: parseInt(top, 10),
          left: parseInt(left, 10),
          zIndex: zIndex
        }}
      >
        {title}
      </div>
    );
  }
}
