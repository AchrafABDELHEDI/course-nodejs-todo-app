var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
//console.log(req.body);
var todo = new Todo({
  text: req.body.text
});
todo.save().then((doc)=>{
  res.send(doc);
}, (e)=>{
  res.status(404).send(e);
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
  var id = req.params.id; // get the id from the parameter
  // check id is valid
  if(!ObjectID.isValid(id)){ // check if id is valid
    return res.status(404).send(); // send 404 if id is not valid
  }

Todo.findById(id).then((todo)=>{ // find by id
  if(!todo){
    res.status(404).send(); // send 400 if not found
  }
  res.send({todo}); // send todo if found
}).catch((e)=>{
  res.status(400).send(); // if error send 400
});
});

 // delete
app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
})

module.exports = {app};
