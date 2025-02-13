const Employee = require('../models/Employee');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

const employeeResolvers = {
  Query: {
    getAllEmployees: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return Employee.find();
    },
    getEmployeeById: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return Employee.findById(id);
    },
    searchEmployees: async (_, { designation, department }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      let query = {};
      if (designation) query.designation = designation;
      if (department) query.department = department;
      return Employee.find(query);
    }
  },
  Mutation: {
    addEmployee: async (_, args, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const employee = new Employee(args);
      return employee.save();
    },
    updateEmployee: async (_, { id, ...updates }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      await Employee.findByIdAndDelete(id);
      return true;
    }
  }
};

module.exports = employeeResolvers;