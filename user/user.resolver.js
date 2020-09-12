const { DynamoDB } = require("aws-sdk");
const { DB_URL, DB_NAME } = require("../config/db.config.json");

const params = {
  region: "localhost",
  endpoint: DB_URL,
  accessKeyId: "local",
  secretAccessKey: "local",
};

const db = new DynamoDB(params);

exports.resolvers = {
  Mutation: {
    saveTweet: async (_, Item) => {
      try {
        console.log("utem", Item);
        const params = {
          TableName: DB_NAME,
          Item: {
            username: {
              S: Item.username,
            },
            timestamp: {
              S: `${Date.now()}`,
            },
            tweet: {
              S: Item.tweet,
            },
          },
        };
        const result = await db.putItem(params).promise();
        console.log(result);
        return Item;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
