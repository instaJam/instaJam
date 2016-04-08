var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: {
          first: String,
          last: String
      },
    username:{type: String, unique: false},
    email:{type: String, required: false},
    password:{type: String, required: false},
    bio:{type: String, required:false},
    gender: String,
    following:[{
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    followers: [{
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    messages: [{
        thread: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
    }],
    profpic:{type:String, default:'http://1.bp.blogspot.com/-Tb_UK9_ePUM/U7oTNS-AnSI/AAAAAAAAPLE/2TT0ltTzqF4/s1600/default+image.jpg'},
    // loc:[Loc]
})

/////////////////////////////////////////
//Populate user info and messages info//
///////////////////////////////////////
userSchema.pre('find', function(next) {
    this.populate('user messages.thread');
    next();
})

module.exports = mongoose.model('User', userSchema);
