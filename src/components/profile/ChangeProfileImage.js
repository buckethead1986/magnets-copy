import React from "react";
import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class ChangeProfileImage extends React.Component {
  constructor() {
    super();

    this.state = {
      image: ""
    };
  }

  componentDidMount() {
    this.setState({
      image: this.props.store.getState().image
    });
  }

  handleClick = () => {
    this.setState(
      prevState => {
        return {
          changingImage: !prevState.changingImage
        };
      },
      () => console.log(this.state.changingImage)
    );
  };

  handleChange = e => {
    this.setState(
      {
        image: e.target.value
      },
      () => console.log(this.state.image)
    );
  };

  handleSubmit = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = { image: this.state.image };
    fetch(`${this.props.url}/users/${this.props.currUser[0].id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json =>
        this.props.store.dispatch({ type: "CHANGE_IMAGE", payload: json.image })
      );
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <br />
          <br />
          <TextField
            hintText="Enter new image url here"
            onChange={this.handleChange}
          />
          <br />
          <RaisedButton label="Submit Url" onClick={this.handleSubmit} />
        </div>

        <div>
          <Avatar
            src={this.state.image}
            size={200}
            style={{
              marginTop: 20,
              marginLeft: (window.innerWidth - 540) / 2
            }}
            onClick={() => this.props.profileLink()}
          />
        </div>
      </div>
    );
  }
}

export default ChangeProfileImage;
