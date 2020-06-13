const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us Todo projects name!']
  },
  description: {
    type: String,
    required: [true, 'Please provide short description'],
    maxlength:30
  },
  todo:{
    type:Object
  },
  doing:{
    type:Array
  },
  done:{
    type:Array
  },
  access:{
    type:Array,
    required: [true, 'Invalid request']
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});


const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
