'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let migrateSessions = require('../sessionsCreator');
let migrateEvents = require('../eventsCreator');
let CalendarController = require('./CalendarController.js');

app.listen(3000, () => { console.log('listening on port 3000...') });


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(bodyParser.json());


app.use('/getdata', (req, res, next)=>{
    next();

})

app.get('/getdata/:owner/:friend/:date', CalendarController.getData,)
    // (req, res) => {
    //   console.log('params: ', req.params); 
    // //   console.log('headers: ', req);
    //   res.send("fuck you");
    // });


app.post('/getdata', //CalendarController.getData)

(req, res, next) => {
    //console.log(req)
    let data = req.body.result;
    migrateSessions(data);
    migrateEvents(data);
    res.end();
})




module.exports = app;