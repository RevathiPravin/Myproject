var express = require('express');
var app = express();
var ProductController = require('./Controller/ProductController')
var CartController = require('./Controller/CartController')
var CartModel = require('./Model/Cart.js')

var bodyParser = require('body-parser');  

app.set('view engine', 'ejs')
app.use(bodyParser.json());                                  
app.use(bodyParser.urlencoded({ extended: true }));        

app.get('/', ProductController.getAllProducts)
app.post('/products/addItemtoCart', (req, res) => {
    if(req.body != undefined && req.body != null) {
        for(var i=0; i<req.body.length; i++) {
             const res =  CartModel.addItems(req.body[i])
        }
     }
})

app.get('/products/getAllCarts', CartController.getAllCartItems)


app.listen(8080);