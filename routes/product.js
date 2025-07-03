const express = require('express');
const router = express.Router();        // mini-instance of web application(server)
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');  
const { showAllProducts, showNewProductForm, addNewProduct, showParticularProduct, showEditProductForm, updateProduct, deleteProduct } = require('../controllers/product');

const multer = require('multer');
const { storage } = require('../utils/cloudinary'); 
const upload = multer({storage});           // using cloudinary-storage


// to show all the products in the DB
router.get('/products', showAllProducts);


// to show the form to add a new product
router.get('/products/new', isLoggedIn, isSeller, showNewProductForm);


// to add a new product in the DB
router.post('/products', upload.single('uploadedImage'), validateProduct, isLoggedIn, isSeller, addNewProduct);


// to show the details of a particular product
router.get('/products/:ID', isLoggedIn, showParticularProduct);


// to show the form to edit a product
router.get('/products/:ID/edit', isLoggedIn, isProductAuthor, showEditProductForm);


// to update the product in the DB
router.patch('/products/:ID', validateProduct, isLoggedIn, isProductAuthor, updateProduct);


// to delete a product from the DB
router.delete('/products/:ID', isLoggedIn, isProductAuthor, deleteProduct);


module.exports = router;