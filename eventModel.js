const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const eventSchema  = new Schema({
        summary:{type: String, default: null},
        id: {type: String, default: true},
        user : {type: String, required: true},
        location:{type: String, default: null},
        start:{type: String, required: true},
        end:{type: String, required: true},
    }, {collection: 'Event'});

module.exports = mongoose.model('Event', eventSchema);