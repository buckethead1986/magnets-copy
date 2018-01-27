import React, { Component } from "react";

const styles = {
  border: "1px dashed black",
  padding: "0.3rem 0.3rem",
  cursor: "move",
  position: "absolute"
};

export default class Box extends Component {
  render() {
    // console.log(this.props);
    // const width = this.props.divWidth / 500;
    // const height = this.props.divHeight / 398;
    // console.log(this.props.divWidth, width, height);
    const { title, top, left } = this.props;
    return (
      <div
        style={{
          ...styles,
          top: parseInt(top),
          left: parseInt(left)
        }}
      >
        {title}
      </div>
    );
  }
}
