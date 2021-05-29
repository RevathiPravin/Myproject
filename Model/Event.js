let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb+srv://revathi_0912:Redhu0912@cluster0.jjilm.mongodb.net/freeslot?retryWrites=true&w=majority'
let db, client
let dbName = 'freeslot'


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