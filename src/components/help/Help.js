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
              Drag and drop words into the blue box to create whatever you want
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              (Login or Signup in the upper right to save poems and allow other
              people to see them!)
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
              users (and/or 'Favorites' if you're logged in) whose poems you'd
              like to see.
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Click on a poem to see a larger view (click it again to return to
              the list of All Poems)
            </Typography>
          </li>
        </ul>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          After you Log In (or Sign Up)
        </Typography>
        <ul>
          <li>
            <Typography variant="subheading">
              Everything is the same, with more options
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              When you Create a Poem (click 'Poem Creation' or 'Magnets' to the
              left), you can now 'Submit' it at the bottom of the page. That
              saves the poem so you and other users can view it
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              All poems now have a 'Favorite Poem' star (it turns red when the
              poem is in your list of Favorites)
            </Typography>
            <ul>
              <li>
                <Typography variant="subheading">
                  Favorited Poems can be found by clicking 'All Poems' to the
                  left, and selecting 'Favorites' in the dropdown menu
                </Typography>
              </li>
            </ul>
          </li>
          <li>
            <Typography variant="subheading">
              All poems have a 'Follow User' icon (it turns blue when you're
              following that user. No, you can't follow yourself)
            </Typography>
            <ul>
              <li>
                <Typography variant="subheading">
                  Followed Users automatically appear in a special subheading in
                  the User List to the left.
                </Typography>
              </li>
            </ul>
          </li>
          <li>
            <Typography variant="subheading">
              Your poems, wherever you find them, have a 'Delete' X mark. If you
              want to remove a poem for any reason, click the X
            </Typography>
          </li>
          <li>
            <Typography variant="subheading">
              Change your Profile Image
            </Typography>
            <ul>
              <li>
                <Typography variant="subheading">
                  Click your username to the left. Click on your current profile
                  picture
                </Typography>
              </li>
              <li>
                <Typography variant="subheading">
                  Enter a new link to a picture, and click 'Submit URL'. Click
                  on your new picture, or any other button or user, to return
                </Typography>
              </li>
            </ul>
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
