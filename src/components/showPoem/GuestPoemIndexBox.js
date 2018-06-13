import React, { Component } from "react";

//shown poem word box, modified for the browser window height and width
const styles = {
  border: "1px solid black",
  borderRadius: "2px",
  padding: "0.2rem 0.2rem",
  cursor: "move",
  position: "absolute",
  backgroundColor: "white",
  fontSize: 10
};

export default class Box extends Component {
  render() {
    const width = this.props.width;
    const height = this.props.height;
    const { title, top, left, zIndex } = this.props;
    return (
      <div
        style={{
          ...styles,
          top: parseInt(top, 10) * height / 550,
          left: parseInt(left, 10) * width / 1250,
          zIndex: zIndex
        }}
      >
        {title}
      </div>
    );
  }
}
