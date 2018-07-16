var {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove

// Todo.findByIdAndRemove('5b422cb23b71123f782a6d9e').then((todo)=>{
//   console.log(todo);
// });

// Todo.findOneAndRemove({_id: '5b422cb23b71123f782a6d9e'}).then((todo)=>{
//
// });
