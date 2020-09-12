import React, { Component } from "react";
import {
  Grid,
  TextField,
  Button,
  AppBar,
  Typography,
  Toolbar,
  Container,
} from "@material-ui/core";
import gql from "graphql-tag";
import { TWEET_URI, USER_URI } from "./client-uri.json";
import client from "./client";
import Tweets from "./components/card";
import "./App.css";

const saveTweets = gql`
  mutation saveTweetMutation($username: String!, $tweet: String!) {
    saveTweet(username: $username, tweet: $tweet) {
      tweet
    }
  }
`;

const getTweets = gql`
  query getTweetList($username: String) {
    getTweet(username: $username) {
      tweet {
        S
      }
      username {
        S
      }
    }
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = { username: "", tweet: "", postUsername: "", tweets: [] };
    this.username = this.username.bind(this);
    this.postUsername = this.postUsername.bind(this);
    this.tweet = this.tweet.bind(this);
    this.fetchTweets = this.fetchTweets.bind(this);
    this.postTweets = this.postTweets.bind(this);
  }

  username(event) {
    this.setState({ username: event.target.value });
    console.log(this.state);
  }

  postUsername(event) {
    this.setState({ postUsername: event.target.value });
    console.log(this.state);
  }

  tweet(event) {
    this.setState({ tweet: event.target.value });
    console.log(this.state);
  }

  async postTweets() {
    console.log(this.state.postUsername, this.state.tweet);
    try {
      const data = await client({ uri: USER_URI }).mutate({
        mutation: saveTweets,
        variables: {
          username: this.state.postUsername,
          tweet: this.state.tweet,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  async fetchTweets() {
    try {
      const { data } = await client({ uri: TWEET_URI }).query({
        query: getTweets,
        variables: { username: this.state.username },
      });

      console.log(data.getTweet);
      this.setState({ tweets: data.getTweet });
      console.log("stte", this.state.tweets);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div>
        <AppBar position="static" style={{ marginBottom: 20 }}>
          <Toolbar>
            <Typography variant="h6">PinTweet</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField label="Enter Username" onChange={this.username} />
              <Button
                variant="contained"
                color="primary"
                onClick={this.fetchTweets}
              >
                Fetch Tweets
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Enter Username" onChange={this.postUsername} />
              <TextField label="Enter Tweet" onChange={this.tweet} />
              <Button
                variant="contained"
                color="primary"
                onClick={this.postTweets}
              >
                Post Tweets
              </Button>
            </Grid>
          </Grid>
          {this.state.tweets.length > 0 ? (
            <Tweets tweets={this.state.tweets} />
          ) : (
            <Typography variant="h3" component="h2" gutterBottom>
              No Tweets
            </Typography>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
