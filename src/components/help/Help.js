import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const PaperSheet = props => {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Welcome to Magnets!
        </Typography>
        <Typography variant="subheading">
          Magnets is a web-based clone of magnetic fridge poetry sets
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              Create poems or witty sayings
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              See poems created by other users
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Follow other users and favorite poems you like
            </Typography>
          </li>
        </ul>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          How to Create a Poem
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              Click 'Poem Creation' or 'Magnets' to the left.
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Select a word set from the dropdown menu (the basic set is
              auto-loaded)
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Drag and drop words to create whatever you want
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              (Login in the upper right to save poems and allow other people to
              see them!)
            </Typography>
          </li>
        </ul>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          How to see other Users' Poems
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              Click on a username to the left
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Their saved poems will pop up
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Click on a poem to see a larger view (click again to return to
              their poem list)
            </Typography>
          </li>
        </ul>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          How to see All Poems
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              Click on a 'All Poems' to the left
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              All Poems will appear. These can be filtered by selecting just the
              users whose poems you'd like to see.
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Click on a poem to see a larger view (click again to return to the
              list of All Poems)
            </Typography>
          </li>
        </ul>
      </Paper>
    </div>
  );
};

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
