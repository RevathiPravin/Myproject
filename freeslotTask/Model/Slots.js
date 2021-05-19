let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017'
let db, client
let dbName = 'task_go'
const moment = require('moment-timezone')

async function createSlot(data) {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('slots');
        let res = await dbCollection.insertMany(data); 
        return { status : true, message : 'success' }

    } catch(e) {
        return { status : false, message : 'failure', error : e }
    }
}

async function getAllSlots(where,timeZone) {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('slots');
        let res =  dbCollection.find(where); 
        let data = []
        let dateTime = []
        await res.forEach(item => {
            console.log("item.dateTime.........",item.dateTime)
            if(item.dateTime != null) {
                dateTime.push(item.dateTime)
                var m = moment.tz(item.dateTime, 'DD/MM/YYYY h:mm:ss A', timeZone);
                item.freeSlot = m.format('DD/MM/YYYY HH:mm:ss A')
            }
            data.push(item)
        })
        return { status : true, message : 'success' , data : data }

    } catch(e) {
        return { status : false, message : 'failure', error : e}
    }
}




module.exports = { createSlot , getAllSlots }