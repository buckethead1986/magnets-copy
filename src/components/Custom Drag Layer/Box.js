import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";

const styles = {
  border: "1px dashed gray",
  padding: "0.3rem 0.3rem",
  cursor: "move"
};

export default class Box extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    yellow: PropTypes.bool
  };

  // static contextTypes = {
  //   redux: React.PropTypes.object
  // };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    const el1 = ReactDOM.findDOMNode(this.refs.target);
    if (this.props.store !== undefined) {
      this.props.updateWordsWithWidthAndHeight(el1);
    }
    //   // console.log(el1, el1.offsetWidth);
    //   // console.log(this.props.store.getState().allWords.length);
    //   if (
    //     this.props.store !== undefined &&
    //     this.props.store.getState().allWords.length !== undefined
    //   ) {
    //     // console.log(
    //     //   "the store is ",
    //     //   this.props.store.getState(),
    //     //   this.props.store
    //     // );
    //     this.props.store.dispatch({ type: "ADD_WIDTH_AND_HEIGHT", payload: el1 });
    //     // console.log(this.props.store.getState().allWords);
    //   }
    //   // this.context.redux.dispatch({ type: "ADD_WIDTH_AND_HEIGHT", payload: el1 });
    // console.log(this.props.store.getState());
  }

  render() {
    // const el1 = ReactDOM.findDOMNode(this.refs.target);
    // console.log(el1);

    // this.props.store.dispatch({ type: "ADD_WIDTH_AND_HEIGHT", payload: el1 });

    const { title, yellow } = this.props;
    const backgroundColor = yellow ? "yellow" : "white";

    return (
      <div
        ref="target"
        id={this.props.id}
        style={{ ...styles, backgroundColor }}
      >
        {title}
      </div>
    );
  }
}
