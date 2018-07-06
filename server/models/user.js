var {mongoose} = require('../db/mongoose.js');

var {Schema} = mongoose;

// create Schema
var userSchema = new Schema({
email : {type:String, required: true, trim: true, minlength:1}
});

// create model
var User = mongoose.model('User', userSchema);

// exports User
module.exports = {User};
