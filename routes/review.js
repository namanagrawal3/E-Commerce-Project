
const express = require('express');
const router = express.Router();        // mini-instance of web application(server)
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middleware');  // middleware to validate the review-data
const { addNewProductReview, deleteProductReview } = require('../controllers/review');


// to add a new review for a product in the DB
router.post('/products/:productID/review', validateReview, addNewProductReview);  


// to delete a review of a product from DB (by review's author)
router.delete('/products/:productID/review/:reviewID', deleteProductReview);


module.exports = router;