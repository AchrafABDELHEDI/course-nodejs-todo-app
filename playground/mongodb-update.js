const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = "TodoApp";

MongoClient.connect(url, (err, client)=>{
  if(err){
    console.log('Failed to connect to the server');
  }
  console.log('Successfully connected to the server');

  const db = client.db(dbName);
  /*
  // update Todo : set completed = false
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5b3fcff3c0aa763b460882db')},
  {$set : {completed: true}},
  {
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });

   // update User : increment age by one
   db.collection('Users').findOneAndUpdate({_id: new ObjectID('5b3fd101c0aa763b46088369')},
   {$inc : {age: 1}},
   {returnOriginal:false}).then((result)=>{
     console.log(result);
   });
  */
  client.close();
})
