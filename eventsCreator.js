const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('./eventModel');

// const dbName = 'mongodb-orm';
// let db;

// mongoose.connect('mongodb://localhost/scheduler').catch(function (reason) {
//     console.log('Unable to connect to the mongodb instance. Error: ', reason);
// });
// mongoose.connection.once('open', () => {

//   console.log('Connected with MongoDB ORM - scheduler');
  // db = client.db(dbName);
// });

// Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName
// method. This method pluralizes the name. Set this option if you need a different name for your collection.



module.exports = function(data){


    for(let i = 0; i < data.items.length; i++){
        Event.findOne({id: data.items[i].id}, (err, obj) => {
            if(obj === null){
                let {id, summary, location } = data.items[i];
                user = data.summary
                start = data.items[i].start.dateTime;
                end = data.items[i].end.dateTime;
                
                Event.create( {user, id, summary, location, start, end }, function(err) {
                    if (err) console.log(`Events err with event ${err}: evt`);
                });
            }
        });

    }
}





