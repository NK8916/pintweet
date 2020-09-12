import React, { Component } from "react";
import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import "./card.css";

export default class Tweets extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props);
    this.state = { tweets: this.props.tweets };
  }
  render() {
    const { tweets } = this.state;
    return (
      <Grid container spacing={2}>
        {tweets.map((tweet) => (
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {tweet.tweet.S}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {tweet.username.S}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
