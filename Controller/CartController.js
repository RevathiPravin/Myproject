var CartModel = require('../Model/Cart.js')
async function getAllCartItems({ req, res }) {

    try {
            
        let data = await CartModel.getItemsInCart()
        res.render('products', {
            title : 'List of Products',
            products : data
        });
        
    } catch(e) {
        console.log("Error while fetching products")
    }
   
}



module.exports = { getAllCartItems };