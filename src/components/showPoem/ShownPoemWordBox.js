import React, { Component } from "react";

//styles for word boxes for rendering poem index or a single poem, based on
//this.props.indexCard, a boolean. Very slight differences between the two.
const styles = {
  indexBox: {
    border: "1px solid black",
    borderRadius: "2px",
    padding: "0.2rem 0.2rem",
    cursor: "move",
    position: "absolute",
    backgroundColor: "white",
    fontSize: 10
  },
  showBox: {
    border: "1px solid black",
    borderRadius: "4px",
    padding: "0.3rem 0.3rem",
    cursor: "move",
    position: "absolute",
    backgroundColor: "white"
  }
};

export default class ShownPoemWordBox extends Component {
  render() {
    const { title, top, left, zIndex } = this.props;
    if (this.props.indexCard) {
      const width = this.props.width;
      const height = this.props.height;
      return (
        <div
          style={{
            ...styles.indexBox,
            top: parseInt(top, 10) * height / 550,
            left: parseInt(left, 10) * width / 1250,
            zIndex: zIndex
          }}
        >
          {title}
        </div>
      );
    } else {
      return (
        <div
          style={{
            ...styles.showBox,
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
}
