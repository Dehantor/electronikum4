const config = require('./config');
const mongoose = require ('mongoose');
module.exports = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.Promise = global.Promise;
        mongoose.set('debug',true);

        mongoose.connection
            .on('error',error=>reject(error))
            .on('close', ()=>console.log('Data close'))
            .once('open',()=>resolve(mongoose.connection[0]));
        mongoose.connect(config.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    });
}
