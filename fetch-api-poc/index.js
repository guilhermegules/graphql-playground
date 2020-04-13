const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
type Query {
  hello(name: String): String!,
  getDog(qtd: Int!): Dog,
}
type Dog {
  message: [String],
  status: String
}
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getDog: async (_, { qtd }) => {
      const response = await fetch(
        `https://dog.ceo/api/breeds/image/random/${qtd}`
      );
      return response.json();
    }
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
