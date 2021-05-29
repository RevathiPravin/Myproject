let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://192.168.29.8:27017'
let db, client
let dbName = 'task_go'


async function createEvent(data) {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('events');
        let res = await dbCollection.insert(data); 
        return { status : true, message : 'success' }

    } catch(e) {
        console.log("<========createEvent===========>",e)
        return { status : false, message : 'failure', error : e }
    }
}

async function getAllEvents() {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('events');
        let res =  dbCollection.find(); 
        let data = []
        await res.forEach(item => {
            data.push(item.gmtDateTime)
        })
        return { resData : data }

    } catch(e) {
        console.log("<========getAllEvents===========>",e)
        return { status : false, message : 'failure', error : e}
    }
}

module.exports = { createEvent , getAllEvents }