const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// remove old documents from collection before each execution

beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
});


const todos = [
{_id: new ObjectID(), "text" : "todo number 1" },
{_id: new ObjectID(), "text" : "todo number 2", completed: true, completedAt: 333}
];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=> done());
});

// group tests in describe
describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var text = 'Test Todo Text';

    request(app) // app is express app in server.js
    .post('/todos') // make a post request
    .send({text}) // send text in the body (as we did with postman)
    .expect(200) // expect code 200 : OK
    .expect((res)=>{
      expect(res.body.text).toBe(text); // the text is send back in return, check if it's the same
    })
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1); // we inserted one document after deleting the old ones, we check if we only have 1 doc in the collection with find method
        expect(todos[0].text).toBe(text); // check text in the created document is the same text sent in the request
        done();
      }).catch((e)=>done(e));
    });
  });
  // second test to be sure that todos sent with invalid data witll not create todos in the collection
     it('should not create todo with invalid body data', (done)=>{
        var text = {};
        request(app) // app is express app in server.js
        .post('/todos') // make a post request
        .send(text) // send text in the body (as we did with postman)
        .expect(404) // expect code 200 : OK
        .end((err, res)=>{
          if(err){
            return done(err);
          }
          Todo.find().then((todos) =>{
            expect(todos.length).toBe(2); // docs will be removed from the collection so there should be no docs created
            done();
          }).catch((e)=>done(e));
     });

  });
});

// describe to test Get /Todos
describe('Get /Todos', ()=>{
  it('should get all todos', (done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

// describe to test Get/todos/id
describe('Get /Todos/:id', ()=>{
  it('should return todo doc', (done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

 // test if todo not found (valid id)
  it('should return 404 if todo not found', (done)=>{
    var hexId = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

   it('should return 404 for non object ids', (done)=>{
    request(app)
    .get('/todos/123abc')
    .expect(404)
    .end(done);
   });
});

// test delete /todos/:id
describe('DELETE /todos/:id', ()=>{
  it('should remove a toto', (done)=>{
    var hexId = todos[1]._id.toHexString(); // remove the second to inserted in the table todos

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId); // check the deleted todo has the same id
    })
    .end((err, res)=>{
      if(err){
        return done(err);
      }
// check todo does not exist after being removed
      Todo.findById(hexId).then((todo)=>{
        expect(todo).toNotExist();
        done();
      }).catch((e)=>done(e));
    });
  });

  it('should return 404 if todo not found', (done)=>{
    var hexId = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if object id is invalid', (done)=>{
    var hexId = new ObjectID().toHexString();
    request(app)
    .delete('/todos/123abc')
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', ()=>{
  it('should update the todo', (done)=>{
     var hexId = todos[0]._id.toHexString();
     var text = 'This is the new text';

     request(app)
     .patch(`/todos/${hexId}`)
     .send({completed: true, text}) //update completed to true and text
     .expect(200)
     .expect((res)=>{
       expect(res.body.todo.text).toBe(text); // text sent back should be the new one (once updated)
       expect(res.body.todo.completed).toBe(true); // completed should be true
       expect(res.body.todo.completedAt).toBeA('number'); // completedAt should be a num
     })
     .end(done);
  });

  it('should clear completedAt when todo is not completed', (done)=>{
    var hexId = todos[1]._id.toHexString();
    var text = 'This is the new text!!';

    request(app)
    .patch(`/todos/${hexId}`)
    .send({completed: false, text}) //update completed to true and text
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text); // text sent back should be the new one (once updated)
      expect(res.body.todo.completed).toBe(false); // completed should be true
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});
