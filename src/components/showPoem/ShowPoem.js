import React from "react";
import "../../App.css";
// import Container from "../Custom Drag Layer/Container";

const styles = {
  width: window.innerWidth,
  height: 300,
  border: "1px solid black",
  position: "relative"
};

const boxStyles = {
  border: "1px dashed gray",
  padding: "0.3rem 0.3rem",
  cursor: "move",
  position: "absolute"
};

class Poem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: {}
    };
  }

  componentDidMount() {
    const id = window.location.href.split("/");
    const thisPoemId = id[id.length - 1];
    fetch(`${this.props.url}/poems/${thisPoemId}`)
      .then(res => res.json())
      .then(
        json => {
          console.log(json);
          debugger;
        }
        // this.setState(
        //   {
        //     poem: json
        //   },
        //   () => console.log(this.state.poem.content)
        // )
      );
  }

  renderBox = (item, key) => {
    return (
      <div>
        {item}, {key}
      </div>
    );
  };

  //construct a 'renderboxes method, assign speciic style to each based on the fetched x,y coordiantes'
  render() {
    console.log(this.state.poem);
    return (
      <div style={styles}>
        {Object.keys(this.state.poem).map(key =>
          this.renderBox(this.state.poem[key], key)
        )}
      </div>
    );
  }
}

export default Poem;
