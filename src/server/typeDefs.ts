const typeDefs = `#graphql
 type ChuquicamataItem {
    url: String
    title: String
  }
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }

  type Mutation {
    triggerChuquicamata: [ChuquicamataItem]
  }
`;

export { typeDefs };
