const { DynamoDB } = require("aws-sdk");

const params = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "local",
  secretAccessKey: "local",
};

const db = new DynamoDB(params);

const mockedResponse = [
  {
    bookId: 1,
    price: "29.99",
    inStock: 215,
  },
  {
    bookId: 2,
    price: "19.99",
    inStock: 45,
  },
];
exports.resolvers = {
  Mutation: {
    saveTweet: async (params) => {
      try {
        return db.putItem(params);
      } catch (err) {
        console.error(err);
      }
    },
  },
  Query: {
    stock() {
      return mockedResponse;
    },
  },
  Stock: {
    __resolveReference(reference) {
      return mockedResponse.find(
        (x) => parseInt(x.bookId) === parseInt(reference.bookId)
      );
    },
  },
};
