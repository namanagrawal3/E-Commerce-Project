const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/User');
const { showUserCart, addProductInCart, removeProductFromCart, buyParticularProduct } = require('../controllers/cart');


// to see the cart of a user
router.get('/user/cart', isLoggedIn, showUserCart);


// to actually add the product in the user's cart
router.post('/user/:productID/add', isLoggedIn, addProductInCart);


// to remove a product from the user's cart
router.delete('/user/:productID/remove', isLoggedIn, removeProductFromCart);


// to buy a particular product (clear the cart and add that single product)
router.post('/user/:productID/buy', isLoggedIn, buyParticularProduct);


module.exports = router;