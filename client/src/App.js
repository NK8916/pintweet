import React, { Component } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  AppBar,
  TabPan,
  IconButton,
  Typography,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { username: "" };
    this.username = this.username.bind(this);
  }

  username(event) {
    this.setState({ username: event.target.value });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">PinTweet</Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Enter Username" onChange={this.username} />
            <Button variant="contained" color="primary">
              Fetch Tweets
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Enter Username" />
            <TextField label="Enter Tweet" />
            <Button variant="contained" color="primary">
              Post Tweets
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
