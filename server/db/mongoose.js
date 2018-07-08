const mongoose = require('mongoose');
const options = {dbName : 'heroku_s293xt0j'};
const url = 'mongodb://localhost:27017/';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || url, options);

module.exports = {mongoose};
