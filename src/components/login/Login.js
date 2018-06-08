// import React from "react";
// import { RaisedButton, TextField } from "material-ui";
// import { withStyles } from '@material-ui/core/styles';
// import { Link } from "react-router-dom";

import React from "react";
// import { Grid, Row, Col } from "react-flexbox-grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#2196F3",
    textColor: "white"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

//Login and Signup buttons don't automatically submit on 'enter', and I spent a long time trying to fix that issue.
//If you know a workaround, please let me know!
class Login extends React.Component {
  state = {
    existingUsername: "",
    existingPassword: "",
    newUsername: "",
    newPassword: "",
    loginError: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogin = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.state;
    fetch(`${this.props.url}/auth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
        } else {
          this.setState({
            loginError: true
          });
        }
      })
      .then(() => this.props.fetchUsers())
      .then(() => console.log("logged in", localStorage.getItem("token")));
    // .then(() => this.props.history.push("/profile"));
  };

  //renders login form on 'true' second argument, signup form on 'false'. Almost identical components.
  renderLoginForm = (classes, login) => {
    return login ? (
      <Grid item xs={8} sm={4}>
        <Paper className={classes.paper}>
          <Typography variant="headline" component="h3">
            Existing User Login
          </Typography>

          <form
            align="left"
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={e => this.handleSubmit(e)}
          >
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="existingUsername"
                  label="Username"
                  className={classes.textField}
                  value={this.state.existingUsername}
                  onChange={this.handleChange("existingUsername")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="existingPassword"
                  label="Password"
                  className={classes.textField}
                  value={this.state.existingPassword}
                  type="password"
                  onChange={this.handleChange("existingPassword")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    ) : (
      <Grid item xs={8} sm={4}>
        <Paper className={classes.paper}>
          <Typography variant="headline" component="h3">
            New User Signup
          </Typography>
          <form
            align="left"
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={e => this.handleSubmited(e)}
          >
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="newUsername"
                  label="Username"
                  className={classes.textField}
                  value={this.state.newUsername}
                  onChange={this.handleChange("newUsername")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="newPassword"
                  label="Password"
                  className={classes.textField}
                  value={this.state.newPassword}
                  type="password"
                  onChange={this.handleChange("newPassword")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Signup
            </Button>
          </form>
        </Paper>
      </Grid>
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("clicked", e);
  };

  handleSubmited = e => {
    e.preventDefault();
    console.log("clicking", e);
  };

  //All the red is from the single quote in "you're" (line 63). I spent some time researching this and it appears to be a 'Yeah, but it doesnt break, so theres no pressure to fix it' issue
  render() {
    // const link = <a href={this.props.history.push("/profile")}>log in</a>;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={2} sm={1} />
          {this.renderLoginForm(classes, true)}
          <Grid item xs={4} sm={2} />
          {this.renderLoginForm(classes, false)}
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
