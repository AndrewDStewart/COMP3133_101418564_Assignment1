/*
COMP3133
Assignmennt 1
Andrew Stewart
101418564
*/
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  designation: { type: String, required: true },
  salary: { type: Number, required: true, min: 1000 },
  date_of_joining: { type: Date, required: true },
  department: { type: String, required: true },
  employee_photo: String,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);