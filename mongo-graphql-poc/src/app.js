const express = require("express");
const expressGraphQl = require("express-graphql");
const mongoose = require("mongoose");
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const app = express();

mongoose.connect("mongodb://localhost/person", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

const personModel = mongoose.model("person", {
  firstname: String,
  lastname: String,
});

const personType = new GraphQLObjectType({
  name: "person",
  fields: {
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      people: {
        type: GraphQLList(personType),
        resolve: (root, args, context, info) => {
          return personModel.find();
        },
      },
      person: {
        type: personType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return personModel.findById(args.id);
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      person: {
        type: personType,
        args: {
          firstname: { type: GraphQLNonNull(GraphQLString) },
          lastname: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          let person = new personModel(args);
          return person.save();
        }
      },
    },
  }),
});

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
