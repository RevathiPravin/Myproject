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
       
       
        return res


    } catch(e) {
        console.log("Error while adding item to cart.....",e)
    }

}


module.exports = { getAllProducts , addItemToCart };