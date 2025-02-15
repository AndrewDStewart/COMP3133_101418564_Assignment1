const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        throw new Error('User not found');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    getAllEmployees: async () => {
      return await Employee.find();
    },
    getEmployeeById: async (_, { id }) => {
      return await Employee.findById(id);
    },
    searchEmployees: async (_, { designation, department }) => {
      let query = {};
      if (designation) query.designation = designation;
      if (department) query.department = department;
      return await Employee.find(query);
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const user = new User({ username, email, password });
      await user.save();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      return await employee.save();
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      const result = await Employee.findByIdAndDelete(id);
      return !!result;
    },
  },
};

module.exports = resolvers;