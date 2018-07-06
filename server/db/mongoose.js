const mongoose = require('mongoose');
const options = {dbName : 'TodoApp'};
const url = 'mongodb://localhost:27017/';

mongoose.Promise = global.Promise;
mongoose.connect(url, options);

module.exports = {mongoose};
