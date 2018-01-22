import React from "react";
import "../../App.css";
import ShowBox from "../Custom Drag Layer/ShowBox";
import PoemCard from "../poemCard/PoemCard";
// import Container from "../Custom Drag Layer/Container";

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const styles = {
  width: 500,
  height: 398,
  marginLeft: window.innerWidth / 2 - 250,
  marginRight: window.innerWidth / 2 - 250,
  border: "solid",
  position: "relative"
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
      .then(json =>
        this.setState(
          {
            poem: json
          },
          () => console.log(this.state.poem.content)
        )
      );
  }

  renderBox = (word, index) => {
    return (
      <div key={index}>
        <ShowBox title={word[1]} left={word[2]} top={word[3] - 4} />
      </div>
    );
  };

  render() {
    let poem;
    let poemWords;
    if (this.state.poem.content !== undefined) {
      poem = this.state.poem.content.split("|").map(word => {
        return word.split("/");
      });
      poemWords = poem.map((word, index) => {
        return this.renderBox(word, index);
      });
    }
    console.log(poemWords);
    return (
      <Card>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="http://www.divebuddy.com/members/photos/pic_1_69507.jpg"
        />

        <div style={styles}>{poemWords}</div>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
          pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate
          interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    );
  }
}

export default Poem;
