const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const userResolvers = require('./resolvers/userResolvers');
const employeeResolvers = require('./resolvers/employeeResolvers');
const connectDB = require('./db');
const authMiddleware = require('./middleware/auth');

const app = express();

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, employeeResolvers],
  context: async ({ req }) => {
    await authMiddleware(req);
    return { user: req.user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();