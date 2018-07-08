var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
//console.log(req.body);
var todo = new Todo({
  text: req.body.text
});
todo.save().then((doc)=>{
  res.send(doc);
}, (e)=>{
  res.status(400).send(e);
});
});

app.get('/todos', (req, res)=>{
Todo.find().then((todos)=>{
  res.send({todos});
}, (e)=>{
 res.status(400).send(e);
});
});

// Get // todos/12345
app.get('/todos/:id', (req, res)=>{
  //res.send(req.params);
  var id = req.params.id;
  // check id is valid
  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  }

Todo.findById(id).then((todo)=>{
  if(!todo){
    res.status(400).send();
  }
  res.send({todo});
}).catch((e)=>{
  res.status(400).send();
});
});

app.listen(3000, ()=>{
  console.log('Started on port 3000');
})

module.exports = {app};
