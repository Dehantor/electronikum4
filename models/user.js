const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require: true
    },
    login:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

const User = module.exports = mongoose.model('User',UserSchema);