const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongodb-orm');

const eventSchema = new Schema({
    id:{type: String, required: true},
    summary:{type: String, required: true},
    htmlLink:{type: String, required: true},
    sequence:{type: Number, required: true},
    created:{type: Date, default: Date.now},
    updated:{type: Date, default: Date.now},
    start:{type: Date, default: Date.now},
    end:{type: Date, default: Date.now}
    }, {collection: 'events'});
  // define schema here


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;