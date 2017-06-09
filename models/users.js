const mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 25
    },
    name: {
      type:String,
      minlength:2,
      maxlength:100
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 255,
        unique: true,
        sparse: true
    },
    age: {
        type: Number,
        min:18,
        max:120,
        default: 18
    }
});

module.exports = mongoose.model('users', UsersSchema);
