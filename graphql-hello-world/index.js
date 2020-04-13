const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    helloWorld: String!
  }
`);

const resolver = {
  helloWorld: () => "Hello World!, first query :D",
};

graphql(schema, "{helloWorld}", resolver).then((response) =>
  console.log(response)
);
