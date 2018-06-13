import React from "react";
import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class ChangeProfileImage extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      url: ""
    };
  }

  componentDidMount() {
    this.setState({
      image: this.props.store.getState().image
    });
  }

  handleChange = e => {
    this.setState({
      image: e.target.value,
      url: e.target.value
    });
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
      )
      .then(() =>
        this.setState({
          url: ""
        })
      )
      .then(() => {
        this.props.showUserLink(this.props.currUser[0].id);
      });
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
            value={this.state.url}
          />
          <br />
          <h5>(A proper url will change the image to the right immediately)</h5>
          <br />
          <RaisedButton label="Submit Url" onClick={this.handleSubmit} />
        </div>

        <div>
          <Avatar
            src={this.state.image}
            size={300}
            style={{
              marginTop: 20,
              marginLeft: 200
            }}
            onClick={() => this.props.showUserLink(this.props.currUser[0].id)}
          />
        </div>
      </div>
    );
  }
}

export default ChangeProfileImage;
