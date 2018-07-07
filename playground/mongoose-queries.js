const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "5b412e03c8caec16f0f8d1ef";

if(!ObjectID.isValid(id)){
  console.log('Id is not valid');
}else{

//// find method
// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('Todos : ' + todos);
// });
//// find one (the first one if there is more then one document)
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo : ' + todo);
// });

// find by id
Todo.findById(id).then((todo)=>{
  if(!todo){
    console.log('Id not found');
  }
  console.log('Todo findById : ' + todo);
}).catch((e)=> console.log(e));

} // fin else

// find user by id
User.findById('5b3fe4925c4dd2485ca4d837').then((user)=>{
  if(!user){
  return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e)=>{
console.log(e);
});
