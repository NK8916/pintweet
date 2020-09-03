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
  Query: {
    getTweet: async (_, data) => {
      try {
        const params = {
          TableName: DB_NAME,
          KeyConditionExpression: "username = :value",
          ExpressionAttributeValues: {
            ":value": {
              S: data.username,
            },
          },
        };
        const result = await db.query(params).promise();
        console.log("res", result.Items);
        return result.Items;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
