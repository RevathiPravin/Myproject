var CartModel = require('../Model/Cart.js')
async function getAllCartItems({ req, res }) {

    try {
            
        let data = await CartModel.getItemsInCart()
        if(data.status) {
            res.render('basket', {
                title : 'My Basket',
                carts : data.data,
                sum: data.totalPrice
            });
        }
        
    } catch(e) {
        console.log("Error while fetching basket")
    }
   
}



module.exports = { getAllCartItems };