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

async function getItemsInCart() {

    try {

        client = await mongoClient.connect(url);
        db = client.db(dbName);
        const pipeline = [
            { "$lookup": { "from": "products", "localField": "item", "foreignField": "item", as: "products" } },
            { "$unwind" : "$products" },
            { "$project" : { "item" : "$item" , 
                     "addedItemsCount" : "$addedcount" , 
                     "individualPrice" : "$products.price",
                     "actualPrice": { "$cond": [ { "$eq": [ "$item", "A" ] }, { "$multiply":[ "$products.price", "$addedcount"]}, 
                                    { "$cond": [{ "$eq": [ "$item", "B" ] }, { "$multiply":[ "$products.price", "$addedcount"]}, 
                                    { "$cond": [{ "$eq": [ "$item", "C" ] }, { "$multiply":[ "$products.price", "$addedcount"]}, 
                                    { "$cond": [{ "$eq": [ "$item", "D" ] }, { "$multiply":[ "$products.price", "$addedcount"]}, 0 ]}]}]}]},
                     "reminder" :   { "$cond": [{ "$eq": [ "$item", "A" ] }, { "$mod":[ "$addedcount", 3 ]}, 
                                    { "$cond": [{ "$eq": [ "$item", "B" ] }, { "$mod":[ "$addedcount", 2]}, 0 ]}]}, 
                     "discountPrice" : { "$cond": [{ "$eq": [ "$reminder", 0.0 ]}, { "$multiply":[ 3, 75 ]}, 
                                    { "$cond": [{ "$ne": [ "$reminder", 0.0 ] }, { "$multiply":[ "$actualPrice", "$addedcount"]}, 0 ]}]}
    
    
            }},   
            { "$project" : { 
                "item" : 1,
                "addedItemsCount" : 1,
                "individualPrice" : 1,
                "actualPrice" : 1,
                "reminder" : 1,
                "discountPrice" : { "$cond": [{ "$and" : [ { "$eq": [ "$item", "A" ] }, { "$eq" : [ "$reminder", 0] } ]}, { "$multiply": [ "$addedItemsCount", 25 ]}, 
                          { "$cond": [{ "$and" : [ { "$eq": [ "$item", "B" ] }, 
                                                   { "$eq" : [ "$reminder", 0 ]} 
                                       ]}, { "$multiply": [ "$addedItemsCount", 17.5 ]},
                          { "$cond": [{ "$and" : [ { "$eq": [ "$item", "C" ] },
                                                   { "$eq" : [ "$reminder", 0 ]} 
                                       ]}, "$actualPrice" ,
                          { "$cond": [{ "$and" : [ { "$eq": [ "$item", "D" ] }, 
                                                   { "$eq" : [ "$reminder", 0]}
                                       ]}, "$actualPrice" ,
                          { "$cond": [{ "$ne": [ "$reminder", 0 ] }, "$actualPrice", 0 ]}]}]}]}]}
            }}   
        ]
        let respData = db.collection('carts').aggregate(pipeline);
        let data = []
        let totalSum = 0
        await respData.forEach(resp => {
            totalSum += resp.discountPrice
            data.push(resp)
        })
        if(totalSum > 150) {
            totalSum -= 20
        }
        return { status : true, message : 'success', data : data, totalPrice : totalSum }

    } catch(e) {
        return { status : false, message : 'failure', error : e}
    }
}




module.exports = { addItems , getItemsInCart }