const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:{
        type:String,
        request:true
    },
    author:{
        type:String,
        request:true
    },
    body:{
        type:String,
        request:true
    }
})
let Article = module.exports = mongoose.model('Article',articleSchema);