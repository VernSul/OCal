const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const dbName = 'mongodb-orm';
// let db;

mongoose.connect('mongodb://localhost/scheduler').catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});
mongoose.connection.once('open', () => {

  console.log('Connected with MongoDB ORM - scheduler');
  // db = client.db(dbName);
});

// Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName
// method. This method pluralizes the name. Set this option if you need a different name for your collection.

let userSchema  = new Schema({
  summary:{type: String, required: true},
  timeZone:{type: String, required: true},
  updated:{type: String, default: Date.now},
}, {collection: 'sessions'});



let User = mongoose.model("User", userSchema);

module.exports = function(data){
    data.summary = data.summary.slice(0, -10);

    User.findOne({summary: data.summary}, (err, obj) => {
        if(obj === null){
            let {summary, timeZone, updated } = data;
            User.create( {summary, timeZone, updated}, function(err) {
                if (err) console.log(`Sessions err with event ${err}: evt`);
            });
        }
    });
}





