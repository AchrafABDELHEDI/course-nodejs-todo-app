//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //ES6

// to generate a new object id
//var obj = new ObjectID();
//console.log('obj : ' + obj);

const url = 'mongodb://localhost:27017';
const dbName = "TodoApp";

MongoClient.connect(url, (err, client)=>{

  if(err){
    console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected successfully to server');

  const db = client.db(dbName);
/*
 // insert document in Todos collection
  db.collection('Todos').insertOne({
    text: 'some thing to do',
    completed: false
  }, (err, result) =>{
    if(err){
      return console.log('Unable to insert to do', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2))
  });

// insert document in Users collection
 db.collection('Users').insertOne({
   name: 'Achraf',
   age:31,
   location:'Paris'
 }, (err, result) =>{
   if(err){
     return console.log('Unable to insert user', err);
   }
   console.log(JSON.stringify(result.ops, undefined, 2));
   // to get the timestamp from the generated id
   console.log(result.ops[0]._id.getTimestamp());
 });
 */

  client.close();
});
