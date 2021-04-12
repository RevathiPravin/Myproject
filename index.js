var express = require('express');
var app = express();
var ProductController = require('./Controller/ProductController')
var CartController = require('./Controller/CartController')

var bodyParser = require('body-parser');  

app.set('view engine', 'ejs')
app.use(bodyParser.json());                                  
app.use(bodyParser.urlencoded({ extended: true }));        

app.get('/', ProductController.getAllProducts)
app.post('/products/addItemtoCart', ProductController.addItemToCart)
app.post('/products/addItemtoCart', ProductController.addItemToCart)
app.get('/products/getAllCarts', CartController.getAllCartItems)


app.listen(8080);