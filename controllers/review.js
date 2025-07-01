const Product = require('../models/Product');
const Review = require('../models/Review');


const addNewProductReview = async (req, res) => {
    try {
        const { productID } = req.params;
        const { rating, comment } = req.body;

        const foundProduct = await Product.findById(productID);
        const newReview = new Review({rating, comment});  // create a new review instance   
        await newReview.save();                           // save the review in the DB 

        // Average-Rating Logic
        const newAvgRating = ((foundProduct.avgRating * foundProduct.reviews.length) + parseInt(rating)) / (foundProduct.reviews.length + 1);
        foundProduct.avgRating = parseFloat(newAvgRating.toFixed(1));

        foundProduct.reviews.push(newReview._id);            
        await foundProduct.save();                        // save the product in the DB with the new review added
        req.flash('success', 'Review added successfully!!');  // flash message to show success message
        res.redirect(`/products/${productID}`);  
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    } 
};


module.exports = { addNewProductReview };