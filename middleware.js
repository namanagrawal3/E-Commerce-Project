
const Product = require('./models/Product');
const { productSchema, reviewSchema } = require('./schema');


const validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });
    if (error) {
        return res.render('error', { error: error.message });
    }
    next();
};


const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.render('error', { error: error.message });
    }
    next();
};


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login first!!');
        return res.redirect('/login');
    }
    next();
};


const isSeller = (req, res, next) => {
    if (!req.user.role || req.user.role !== 'seller') {
        req.flash('error', 'You do not have the permission to do so!!');
        return res.redirect('/products');
    }
    next();
};


const isProductAuthor = async (req, res, next) => {
    const { ID } = req.params;      // product-id
    const foundProduct = await Product.findById(ID);
    if (!foundProduct.author.equals(req.user._id)) {
        req.flash('error', 'You do not have the permission to do so!!');
        return res.redirect(`/products/${ID}`);
    }
    next();
};


module.exports = { validateProduct, validateReview, isLoggedIn, isSeller, isProductAuthor };
