import React, { Component } from "react";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import Box from "./Box";

//comment in all 'tick' lines and render <Box title={title} yellow={tickTock} /> if flashing yellow on drag is wanted
//switch transform and WebkitTransform in 'styles' to the commented out lines if a tilt on drag is wanted

const styles = {
  display: "inline-block",
  // transform: "rotate(-7deg)",
  // WebkitTransform: "rotate(-7deg)"
  transform: "",
  WebkitTransform: ""
};

export default class BoxDragPreview extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  // constructor(props) {
  //   super(props);
  // this.tick = this.tick.bind(this);
  // this.state = {
  //   tickTock: false
  // };
  // }

  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // method to flash yellow every 0.5 seconds
  // tick() {
  //   this.setState({
  //     tickTock: !this.state.tickTock
  //   });
  // }

  render() {
    const { title } = this.props;
    // const { tickTock } = this.state;

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
