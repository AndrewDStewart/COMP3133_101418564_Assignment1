/*
COMP3133
Assignmennt 1
Andrew Stewart
101418564
*/
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    login(username: String!, password: String!): AuthPayload!
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee
    searchEmployees(designation: String, department: String): [Employee!]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload!
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String
      designation: String!
      salary: Float!
      date_of_joining: String!
      department: String!
      employee_photo: String
    ): Employee!
    updateEmployee(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Float
      date_of_joining: String
      department: String
      employee_photo: String
    ): Employee!
    deleteEmployee(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;