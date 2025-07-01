
const express = require('express');
const router = express.Router();        // mini-instance of web application(server)
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middleware');  // middleware to validate the review-data
const { addNewProductReview } = require('../controllers/review');


// to add a new review for a product in the DB
router.post('/products/:productID/review', validateReview, addNewProductReview);  


module.exports = router;