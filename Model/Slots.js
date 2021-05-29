let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017'
let db, client
let dbName = 'task_go'
const moment = require('moment-timezone')
var ObjectID = require('mongodb').ObjectID;

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
        await res.forEach(item => {
            if(item.gmtDateTime != null) {
                var m = moment.tz(item.gmtDateTime, 'DD/MM/YYYY h:mm:ss A', timeZone);
                item.requestedZoneTime = m.format('DD/MM/YYYY HH:mm:ss A')
            }
            data.push(item)
        })
        return { status : true, message : 'success' , data : data }

    } catch(e) {
        return { status : false, message : 'failure', error : e}
    }
}

async function updateSlot(where) {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('slots');
        let res =  dbCollection.find({
            "gmtDateTime": { "$gte": new Date(where.reqDate) , "$lte": where.reqDateTime }}).sort({ "gmtDateTime" : -1}).limit(1); 
            let updateRes
        await res.forEach(item => {
            let upDate = { isAvailable : 'Not Available' }
            updateRes = dbCollection.updateOne({ "_id" : new ObjectID(item._id)} , {"$set" : { "isAvailable" : "Not Available" }}, { upsert: true })
        })
        let resp = await updateRes
        return { status : true, message : 'Success', data : resp.result}


    } catch(e) {
        return { status : false, message : 'failure', error : e}
    }
}


module.exports = { createSlot , getAllSlots , updateSlot }