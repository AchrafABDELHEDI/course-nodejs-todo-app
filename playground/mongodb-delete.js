const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = "TodoApp";

MongoClient.connect(url, (err, client)=>{
  if(err){
    console.log('Unable to connect to MongoDB Server');
  }
  console.log('Successfully connected to server');

  const db = client.db(dbName);

  // delete Many
  //db.collection('Todos').deleteMany({text: 'Eat Launch'}).then((result)=>{
  //  console.log(result);
  //});

  // delete One document
  //db.collection('Todos').deleteOne({text: 'Eat Launch'}).then((result)=>{
  //  console.log(result);
  //});

  // find one and delete
  //db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
  //  console.log(result);
  //});

  // delete many
  //db.collection('Users').deleteMany({name: 'Andrew'}).then((result)=>{
  //  console.log(result);
  //})

  // find one and delete (the first one)
  //db.collection('Users').findOneAndDelete({_id: new ObjectID('5b3fd116c0aa763b46088373')})
  //.then((result)=>{
  //  console.log(result, undefined, 2);
  //});

  client.close();
});
