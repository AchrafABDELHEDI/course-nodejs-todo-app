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

  //db.collection('Todos').find({_id: new ObjectID('5b3d353c84a83442d8a52c47')}).toArray().then((docs)=>{
  db.collection('Users').find({name: 'Achraf'}).toArray().then((docs)=>{ // find documents where name = 'Achraf'
    console.log('Todos :');
    console.log(JSON.stringify(docs, undefined, 2));
  },(err)=>{
    console.log('Unable to fetch todos', err);
  });

// get the number of documents (count)
  db.collection('Todos').find().count().then((count)=>{
    console.log(`Todos Count : ${count}`);
  },(err)=>{
    console.log('Unable to fetch todos', err);
  });
  //client.close();
});
