import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import ItemTypes from "./ItemTypes";
import Box from "./Box";

const boxSource = {
  beginDrag(props) {
    const { id, title, left, top, zIndex } = props;
    return { id, title, left, top, zIndex };
  }
};

function getStyles(props) {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: "absolute",
    float: "right",
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
    zIndex: props.store.getState().zIndex
  };
}

class DraggableBox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render() {
    const { title, connectDragSource } = this.props;

    return connectDragSource(
      <div style={getStyles(this.props)}>
        <Box
          title={title}
          store={this.props.store}
          updateWordsWithWidthAndHeight={
            this.props.updateWordsWithWidthAndHeight
          }
          id={this.props.id}
        />
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(DraggableBox);
