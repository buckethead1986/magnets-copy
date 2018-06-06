import React, { Component } from "react";

//shown poem word box, modified for the browser window height and width
const styles = {
  border: "1px solid black",
  borderRadius: "2px",
  padding: "0.2rem 0.2rem",
  cursor: "move",
  position: "absolute",
  fontSize: 11
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
          top: parseInt(top, 10) * height,
          left: parseInt(left, 10) * width
        }}
      >
        {title}
      </div>
    );
  }
}
