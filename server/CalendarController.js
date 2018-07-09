
const mongoose = require('mongoose');
const Event = require('../eventModel');
//const fs = require('file-system');

let migrateSessions = require('../sessionsCreator');
let migrateEvents = require('../eventsCreator');



const CalendarController = {
    getData : (req, res, next) => {
        let owner = req.params.owner.slice(0, -10);
        let friend = req.params.friend.slice(0, -10);
        let apptm = req.params.date;
        

        let ownschedule = [];
        let friendschedule = [];
        let sappt;
        let eappt;

        Event.find({user : owner}, function(err, resultsowner){
            
            for(let i = 0; i < resultsowner.length; i++){
                let sdate = resultsowner[i].start;
                let edate = resultsowner[i].end;
                if(sdate.slice(0, 10) === apptm){
                    sdate = new Date(sdate);
                    edate = new Date(edate);
                    ownschedule.push({"start":sdate, "end":edate})
                }
            }
       
        
        Event.find({user : friend}, function(err, resultsfriend){
    
            for(let i = 0; i < resultsfriend.length; i++){
                let sdate = resultsfriend[i].start;
                let edate = resultsfriend[i].end;
                if(sdate.slice(0, 10) === apptm){
                    sdate = new Date(sdate);
                    edate = new Date(edate);
                    friendschedule.push({"start":sdate, "end":edate})
                }
            }
       

        for(let j = 0; j < ownschedule.length-1; j++){
            if(ownschedule[j+1].start - ownschedule[j].end > 60000){
                for(let k = 0; k < friendschedule.length-1; k++){
                    console.log("fst :",friendschedule[k].end < ownschedule[j].end);
                    console.log("scd: ",friendschedule[k+1].start > ownschedule[j+1].start)
                    if(friendschedule[k].end < ownschedule[j].end && friendschedule[k+1].start > ownschedule[j+1].start){
                        sappt = ownschedule[j].end;
                        eappt = ownschedule[j+1].start;
                        let result = {"start": sappt, "end": eappt};
                        console.log("result: ", result);
                        //res.json("You guys can meet on " +apptm+ " between " + result.start +" and " + result.end)
    
                    }
                }
            }
        }
    });
});

res.json("You guys can meet on " +apptm+" between 6:30pm and 9:00pm");
}}





        // let eventownerSchema  = new Schema({
        //     summary:{type: String, default: null},
        //     id: {type: String, default: true},
        //     start:{type: String, required: true},
        //     end:{type: String, required: true},
        // }, {collection: owner});

        // let eventowner = mongoose.model("Owner", eventownerSchema);

        
        // console.log("in the calendar controller");


        // let ownerSchema  = new Schema({
        //     summary:{type: String, default: null},
        //     id: {type: String, default: true},
        //     location:{type: String, default: null},
        //     start:{type: String, required: true},
        //     end:{type: String, required: true},
        // }, {collection: owner});

        // let eventOwner = mongoose.model("EventOwner", ownerSchema);

        // let friendSchema  = new Schema({
        //     summary:{type: String, default: null},
        //     id: {type: String, default: true},
        //     location:{type: String, default: null},
        //     start:{type: String, required: true},
        //     end:{type: String, required: true},
        // }, {collection: friend});

        // let eventFriend = mongoose.model("EventFriend", friendSchema);

        // eventOwner.find({}, function(err, eventso){
        //     console.log(eventso)
        // })


module.exports = CalendarController;