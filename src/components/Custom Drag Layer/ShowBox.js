import React, { Component } from "react";

const styles = {
  border: "1px dashed black",
  padding: "0.3rem 0.3rem",
  cursor: "move",
  position: "absolute"
};

export default class Box extends Component {
  render() {
    const { title, top, left } = this.props;
    return (
      <div style={{ ...styles, top: parseInt(top), left: parseInt(left) }}>
        {title}
      </div>
    );
  }
}
