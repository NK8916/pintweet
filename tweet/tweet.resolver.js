const mockedResponse = [
  {
    id: "1",
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
  },
  {
    id: "2",
    title: "Game of Thrones",
    author: "George R. R. Martin",
  },
];
//resolvers to return the response, based on the previous defined query and to resolve references from third party calls
exports.resolvers = {
  Query: {
    library() {
      return mockedResponse;
    },
  },
  Book: {
    stock(book) {
      return {
        __typename: "Stock",
        bookId: book.id,
      };
    },
  },
};
