var {mongoose} = require('../db/mongoose.js');

var {Schema} = mongoose;

// create Schema
var todoSchema = new Schema({
  text : {type : String, required: true, trim: true, minlength:1},
  completed : {type: Boolean, default:false},
  completedAt : {type: Number, default:null}
});

// create model
var Todo = mongoose.model('Todo', todoSchema);

// exports todo model
module.exports = {Todo};
