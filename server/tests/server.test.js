const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// remove old documents from collection before each execution
/*
beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
});
*/

const todos = [{
  "text" : "todo number 1"
}, { "text" : "todo number 2" }];

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
        .expect(400) // expect code 200 : OK
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
