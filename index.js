const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  enum Status {
    GOOD
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID!
    name: String!
  }

  type Movie {
    id: ID!
    title: String!
    releaseDate: String
    rating: Int
    status: Status
    actor: [Actor] # Valid null, [], [....some data], X not valid [....somd data without name or id]
    #actor: [Actor]! Valid [], [...some data]
    # actor: [Actor!]! Valid [...some data]
    # fake: Float
    # fake2: Boolean
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`;

const movies = [
  {
    id: "asdfasddfd",
    title: "5 Deadly Venoms",
    releaseDate: "10-10-1983"
  },
  {
    id: "asdfasddfddddd",
    title: "36th Chamber",
    releaseDate: "10-10-1983",
    rating: 5,
    actor: [
      {
        id: "asdfasdf",
        name: "Gordon Liu"
      }
    ]
  }
];

const resolvers = {
  Query: {
    movies: () => {
      return movies;
    },

    movie: (obj, { id }, context, info) => {
      const foundMovie = movies.find(movie => {
        return movie.id === id;
      });
      return foundMovie;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server
  .listen({
    port: process.env.PORT || 4000
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`);
  });
