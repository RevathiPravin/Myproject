var ProductModel = require('../Model/Products.js')
var CartModel = require('../Model/Cart.js')
async function getAllProducts({ req, res }) {

    try {
            
        let data = await ProductModel.getAllProduct()
        res.render('products', {
            title : 'List of Products',
            products : data
        });
        
    } catch(e) {
        console.log("Error while fetching products")
    }
   
}

async function addItemToCart({ req, res }) {

    try {
       
        let saveData = {}
        if(req.body != undefined && req.body != null) {
            saveData.itemA = req.body.itemA
            saveData.itemB = req.body.itemB
            saveData.itemC = req.body.itemC
            saveData.itemD = req.body.itemD
        }
        const res = await CartModel.addItems(saveData)
        return res


    } catch(e) {
        console.log("Error while adding item to cart.....")
    }

}


module.exports = { getAllProducts , addItemToCart };