let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017'
let db, client
let dbName = 'task'


async function addItems(data) {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('carts');
        let addToCart = await dbCollection.insertOne(data); 
        return { status : true, message : 'success' }

    } catch(e) {
        return { status : false, message : 'failure', error : e}
    }
}

async function getItemsInCart (data) {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('carts');
        let addToCart = await dbCollection.insertOne(data); 
        return { status : true, message : 'success' }

    } catch(e) {
        return { status : false, message : 'failure', error : e}
    }
}




module.exports = { addItems }