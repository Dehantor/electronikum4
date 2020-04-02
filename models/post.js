const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title:{
        type:String,
        request:true
    },
    body:{
        type:String
    }
})
    module.exports = mongoose.model('Post',schema);