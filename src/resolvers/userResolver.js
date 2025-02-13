const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-express');

const userResolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        throw new UserInputError('User not found');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UserInputError('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    }
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new UserInputError('Username or email already exists');
      }
      const user = new User({ username, email, password });
      await user.save();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    }
  }
};

module.exports = userResolvers;