import { triggerChuquicamata } from './mutations';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    triggerChuquicamata,
  },
};

export { resolvers };
