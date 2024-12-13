import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTodos(completed: Boolean): [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo!
    updateTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;
