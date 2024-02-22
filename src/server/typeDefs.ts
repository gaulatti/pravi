const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }

  type Mutation {
    triggerChuquicamata: Int
  }
`;

export { typeDefs };
