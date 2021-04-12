let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017'
let db, client
let dbName = 'task'

async function getAllProduct() {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        let dbCollection = db.collection('products');
        let products = await dbCollection.find(); 
        return products.toArray();
    } catch(e) {
        console.log("Error while fetching products")
    }
    finally{ client.close(); }
}
    
   



module.exports = { getAllProduct }