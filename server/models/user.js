const {mongoose} = require('../db/mongoose.js');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var {Schema} = mongoose;

// create Schema
var userSchema = new Schema({
email : {
  type:String,
  required: true,
  trim: true,
  minlength:1,
  unique:true,
  validate:{
    validator: (value)=>{
    return validator.isEmail(value);
    },
    message: '{value} is not a valid email'
  }
},
password: {
  type: String,
  require:true,
  minlength:6
},
 tokens: [
   {
     access: {
       type:String,
       required: true
     },
     token: {
       type: String,
       required: true
     }
   }
 ]
});

// instance method (.methods)
userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id','email']);
}
// instance method (.methods)
userSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();
  // user.tokens.push({
  //   access, token
  // });
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(()=>{
    return token;
  });
};

// module method (.statics)
userSchema.statics.findByToken = function (token){
  var user = this;
  var decoded;

  try{
    decoded = jwt.verify(token, 'abc123');
  }catch (e){
    // return new Promise((resolve, reject)=>{
    //   reject();
    // });
    return Promise.reject();
  }

return User.findOne({
  _id: decoded._id,
  'tokens.token': token,
  'tokens.access':'auth'
});
};

// create model
var User = mongoose.model('User', userSchema);

// exports User
module.exports = {User};
